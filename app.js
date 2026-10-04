// FitFriend - Simple Exercise & Food Companion App
// Lightweight, Offline-First, Easy-to-use

(function () {
  'use strict';

  const STORAGE_KEY = 'fitfriend_app_state_v1';

  // --- Sound Synthesizer (Zero External Dependencies) ---
  class SoundPlayer {
    constructor() {
      this.ctx = null;
    }

    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    beep(freq = 600, duration = 0.15, type = 'sine') {
      try {
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + duration);
      } catch (e) {
        // Audio playback can be safely ignored if blocked
      }
    }

    cheer() {
      try {
        this.init();
        if (!this.ctx) return;
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          setTimeout(() => {
            this.beep(freq, 0.25, 'triangle');
          }, idx * 120);
        });
      } catch (e) {}
    }
  }

  const sound = new SoundPlayer();

  // --- Initial State & Storage ---
  function getDefaultState() {
    return {
      profile: { ...DEFAULT_DATA.friendProfile },
      streak: 1,
      lastActiveDate: new Date().toISOString().split('T')[0],
      waterCount: 0,
      selectedMood: '',
      checklist: [
        { id: 'chk_workout', title: '15-20 min Daily Workout', sub: 'Movement for body & mind', done: false },
        { id: 'chk_breakfast', title: 'Healthy Breakfast', sub: 'Oats, eggs, or fruit bowl', done: false },
        { id: 'chk_lunch', title: 'Balanced Protein Lunch', sub: 'Grains, greens & protein', done: false },
        { id: 'chk_snack', title: 'Nutritious Snack', sub: 'Fruits, nuts, or seeds', done: false },
        { id: 'chk_dinner', title: 'Light & Easy Dinner', sub: 'Soup, veggies & light protein', done: false },
        { id: 'chk_water', title: 'Drank 8 Glasses of Water', sub: 'Stayed hydrated all day', done: false },
        { id: 'chk_sleep', title: '7-8 Hours Restful Sleep', sub: 'Recharge muscle and brain', done: false }
      ],
      currentDietGoal: 'balanced',
      customExercises: [],
      customMeals: [],
      theme: 'light'
    };
  }

  let appState = (function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Check date for daily reset of water & checklist
        const today = new Date().toISOString().split('T')[0];
        if (parsed.lastActiveDate !== today) {
          // If consecutive day, increase streak, else keep or reset
          const lastDate = new Date(parsed.lastActiveDate);
          const currDate = new Date(today);
          const diffDays = Math.round((currDate - lastDate) / (1000 * 60 * 60 * 24));
          if (diffDays === 1) {
            parsed.streak = (parsed.streak || 1) + 1;
          } else if (diffDays > 1) {
            parsed.streak = 1;
          }
          parsed.lastActiveDate = today;
          parsed.waterCount = 0;
          parsed.selectedMood = '';
          if (parsed.checklist) {
            parsed.checklist.forEach(item => item.done = false);
          }
        }
        return { ...getDefaultState(), ...parsed };
      }
    } catch (e) {
      console.warn('Error reading localStorage, using defaults', e);
    }
    return getDefaultState();
  })();

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
    } catch (e) {
      console.warn('Failed to save state to localStorage', e);
    }
  }

  // --- Toast Alert Helper ---
  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // --- Active Tab Switching ---
  function initTabs() {
    const tabs = document.querySelectorAll('.nav-tab');
    const panes = document.querySelectorAll('.tab-pane');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panes.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('active');
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });
  }

  // --- Theme Toggle ---
  function initTheme() {
    const themeBtn = document.getElementById('themeToggleBtn');
    function applyTheme(theme) {
      if (theme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeBtn.textContent = '☀️';
      } else {
        document.documentElement.removeAttribute('data-theme');
        themeBtn.textContent = '🌙';
      }
      appState.theme = theme;
      saveState();
    }

    applyTheme(appState.theme || 'light');

    themeBtn.addEventListener('click', () => {
      const newTheme = appState.theme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(newTheme === 'dark' ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
    });
  }

  // --- Header & Welcome Banner ---
  function renderHeaderAndWelcome() {
    const nameEl = document.getElementById('welcomeFriendName');
    const streakEl = document.getElementById('streakCount');
    const quoteEl = document.getElementById('dailyQuote');
    const noteEl = document.getElementById('friendPersonalNoteDisplay');

    if (nameEl) nameEl.textContent = appState.profile.name || 'Friend';
    if (streakEl) streakEl.textContent = appState.streak || 1;
    if (noteEl) noteEl.textContent = `"${appState.profile.notes || 'Stay consistent and take care of your body!'}"`;

    if (quoteEl && DEFAULT_DATA.quotes.length) {
      // Pick quote based on day
      const dayIndex = new Date().getDate() % DEFAULT_DATA.quotes.length;
      quoteEl.textContent = DEFAULT_DATA.quotes[dayIndex];
    }

    // Mood buttons
    const moodBtns = document.querySelectorAll('.mood-btn');
    const moodBadge = document.getElementById('selectedMoodBadge');
    if (appState.selectedMood && moodBadge) {
      moodBadge.textContent = appState.selectedMood;
      moodBadge.style.display = 'inline-block';
    }

    moodBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mood = btn.getAttribute('data-mood');
        appState.selectedMood = mood;
        if (moodBadge) {
          moodBadge.textContent = mood;
          moodBadge.style.display = 'inline-block';
        }
        saveState();
        showToast(`Mood recorded: ${mood}`);
      });
    });
  }

  // --- Water Intake Tracker ---
  function initWaterTracker() {
    const container = document.getElementById('waterCupsContainer');
    const countText = document.getElementById('waterCountText');
    const statusText = document.getElementById('waterGoalStatus');
    const resetBtn = document.getElementById('btnResetWater');

    function renderCups() {
      if (!container) return;
      container.innerHTML = '';
      const totalGoal = appState.profile.dailyWaterGoal || 8;

      for (let i = 1; i <= totalGoal; i++) {
        const cup = document.createElement('div');
        cup.className = `water-cup ${i <= appState.waterCount ? 'filled' : ''}`;
        cup.innerHTML = `
          <span>💧</span>
          <span class="water-cup-label">#${i}</span>
        `;
        cup.addEventListener('click', () => {
          sound.beep(440, 0.1);
          if (appState.waterCount === i) {
            appState.waterCount = i - 1;
          } else {
            appState.waterCount = i;
          }
          if (appState.waterCount >= totalGoal) {
            // Check water in checklist
            const waterCheck = appState.checklist.find(c => c.id === 'chk_water');
            if (waterCheck && !waterCheck.done) {
              waterCheck.done = true;
              renderChecklist();
            }
            sound.cheer();
            showToast('🎉 Goal Reached! Awesome hydration today!');
          }
          saveState();
          renderCups();
        });
        container.appendChild(cup);
      }

      const liters = (appState.waterCount * 0.25).toFixed(1);
      if (countText) {
        countText.textContent = `${appState.waterCount} / ${totalGoal} glasses (${liters} L)`;
      }
      if (statusText) {
        if (appState.waterCount >= totalGoal) {
          statusText.textContent = '🎉 Goal Completed!';
          statusText.style.color = '#10b981';
        } else {
          const remaining = totalGoal - appState.waterCount;
          statusText.textContent = `${remaining} more to go!`;
          statusText.style.color = 'var(--blue)';
        }
      }
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        appState.waterCount = 0;
        const waterCheck = appState.checklist.find(c => c.id === 'chk_water');
        if (waterCheck) waterCheck.done = false;
        saveState();
        renderCups();
        renderChecklist();
        showToast('Water count reset for today');
      });
    }

    renderCups();
  }

  // --- Habit Checklist ---
  function renderChecklist() {
    const listContainer = document.getElementById('checklistItems');
    if (!listContainer) return;
    listContainer.innerHTML = '';

    appState.checklist.forEach((item, index) => {
      const row = document.createElement('div');
      row.className = `check-item ${item.done ? 'done' : ''}`;
      row.innerHTML = `
        <div class="check-left">
          <div class="checkbox-custom">${item.done ? '✓' : ''}</div>
          <div>
            <div class="check-title">${item.title}</div>
            <div class="check-sub">${item.sub}</div>
          </div>
        </div>
      `;

      row.addEventListener('click', () => {
        item.done = !item.done;
        sound.beep(item.done ? 580 : 380, 0.12);
        saveState();
        renderChecklist();
        if (item.done) {
          showToast(`Completed: ${item.title} 👍`);
        }
      });

      listContainer.appendChild(row);
    });

    const resetBtn = document.getElementById('btnResetChecklist');
    if (resetBtn) {
      resetBtn.onclick = () => {
        appState.checklist.forEach(i => i.done = false);
        saveState();
        renderChecklist();
        showToast('Checklist reset for today');
      };
    }
  }

  // --- Workout Section & Interactive Player ---
  let activeWorkoutRoutine = null;
  let activeExerciseIndex = 0;
  let timerSecondsLeft = 30;
  let timerInterval = null;
  let isTimerRunning = false;

  function renderWorkouts(filterCategory = 'all') {
    const list = document.getElementById('workoutCardsList');
    if (!list) return;
    list.innerHTML = '';

    // Merge standard plans with custom exercises if any
    const plans = DEFAULT_DATA.workoutPlans;

    const filteredPlans = plans.filter(p => {
      if (filterCategory === 'all') return true;
      return p.difficulty.toLowerCase().includes(filterCategory.toLowerCase()) ||
             p.badge.toLowerCase().includes(filterCategory.toLowerCase());
    });

    filteredPlans.forEach(plan => {
      const card = document.createElement('div');
      card.className = 'workout-card';

      // Exercise rows
      let exercisesHtml = '';
      plan.exercises.forEach(ex => {
        exercisesHtml += `
          <div>
            <div class="exercise-row" data-ex-id="${ex.id}">
              <div class="exercise-info">
                <div class="exercise-icon">${ex.icon || '⚡'}</div>
                <div>
                  <div class="exercise-name">${ex.name}</div>
                  <div class="exercise-sub">${ex.target} • ${ex.reps}</div>
                </div>
              </div>
              <span style="font-size: 0.8rem; color: var(--text-muted);">ℹ️ Details</span>
            </div>
            <div class="exercise-instruction-box">
              <strong>How to do it:</strong> ${ex.instruction}
            </div>
          </div>
        `;
      });

      card.innerHTML = `
        <div class="workout-header">
          <div>
            <span class="badge badge-green">${plan.badge}</span>
            <h3 class="workout-title" style="margin-top: 4px;">${plan.title}</h3>
          </div>
          <button class="btn btn-primary btn-sm btn-launch-routine" data-plan-id="${plan.id}">
            ▶️ Start Routine
          </button>
        </div>
        <div class="workout-meta">
          <div class="meta-item">⏱️ ${plan.duration}</div>
          <div class="meta-item">🔥 ${plan.calories}</div>
          <div class="meta-item">📊 ${plan.difficulty}</div>
          <div class="meta-item">💪 ${plan.exercises.length} Exercises</div>
        </div>
        <p style="font-size: 0.86rem; color: var(--text-muted); margin-bottom: 10px;">${plan.description}</p>
        
        <div class="exercise-list">
          ${exercisesHtml}
        </div>
      `;

      // Expand / collapse exercise instruction
      card.querySelectorAll('.exercise-row').forEach(row => {
        row.addEventListener('click', () => {
          row.classList.toggle('expanded');
        });
      });

      // Start routine button
      card.querySelector('.btn-launch-routine').addEventListener('click', () => {
        startWorkoutRoutine(plan);
      });

      list.appendChild(card);
    });

    // Also display custom exercises if any
    if (appState.customExercises && appState.customExercises.length > 0) {
      const customCard = document.createElement('div');
      customCard.className = 'workout-card';
      customCard.style.borderColor = 'var(--primary)';

      let customExercisesHtml = '';
      appState.customExercises.forEach((ex, idx) => {
        customExercisesHtml += `
          <div style="display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border-bottom: 1px solid var(--card-border);">
            <div>
              <div style="font-weight: 600; font-size: 0.9rem;">⭐ ${ex.name}</div>
              <div style="font-size: 0.78rem; color: var(--text-muted);">${ex.target} • ${ex.reps || (ex.durationSeconds + 's')}</div>
            </div>
            <button class="btn btn-outline btn-sm btn-delete-custom-ex" data-idx="${idx}" style="color: #ef4444;">Delete</button>
          </div>
        `;
      });

      customCard.innerHTML = `
        <div class="workout-header">
          <div>
            <span class="badge badge-orange">Custom Routine</span>
            <h3 class="workout-title" style="margin-top: 4px;">Friend's Custom Exercises</h3>
          </div>
          <button class="btn btn-accent btn-sm" id="btnLaunchCustomRoutine">▶️ Start Custom Routine</button>
        </div>
        <div style="margin-top: 10px;">
          ${customExercisesHtml}
        </div>
      `;

      customCard.querySelectorAll('.btn-delete-custom-ex').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const idx = parseInt(e.target.getAttribute('data-idx'));
          appState.customExercises.splice(idx, 1);
          saveState();
          renderWorkouts(filterCategory);
          showToast('Custom exercise removed');
        });
      });

      const launchCustomBtn = customCard.querySelector('#btnLaunchCustomRoutine');
      if (launchCustomBtn) {
        launchCustomBtn.addEventListener('click', () => {
          startWorkoutRoutine({
            id: 'custom_routine',
            title: "Friend's Custom Routine",
            badge: 'Personalized',
            exercises: appState.customExercises
          });
        });
      }

      list.appendChild(customCard);
    }
  }

  // --- Interactive Workout Modal Player ---
  const modalOverlay = document.getElementById('workoutPlayerModal');
  const btnClosePlayer = document.getElementById('btnClosePlayer');
  const btnToggleTimer = document.getElementById('btnToggleTimer');
  const btnNextExercise = document.getElementById('btnNextExercise');
  const btnPrevExercise = document.getElementById('btnPrevExercise');
  const playerTimerDisplay = document.getElementById('playerTimerDisplay');
  const timerCircle = document.getElementById('timerCircleElement');
  const playerContent = document.getElementById('playerContent');
  const playerCelebration = document.getElementById('playerCelebration');
  const btnFinishCelebration = document.getElementById('btnFinishCelebration');

  function startWorkoutRoutine(routine) {
    if (!routine || !routine.exercises || routine.exercises.length === 0) {
      showToast('No exercises in this routine');
      return;
    }
    activeWorkoutRoutine = routine;
    activeExerciseIndex = 0;
    playerContent.style.display = 'block';
    playerCelebration.style.display = 'none';
    modalOverlay.classList.add('active');
    loadExercise(activeExerciseIndex);
  }

  function loadExercise(index) {
    if (!activeWorkoutRoutine || index >= activeWorkoutRoutine.exercises.length) {
      completeWorkoutRoutine();
      return;
    }
    activeExerciseIndex = index;
    const ex = activeWorkoutRoutine.exercises[index];

    document.getElementById('playerRoutineBadge').textContent = activeWorkoutRoutine.title.toUpperCase();
    document.getElementById('playerExerciseName').textContent = ex.name;
    document.getElementById('playerExerciseIcon').textContent = ex.icon || '💪';
    document.getElementById('playerExerciseInstruction').textContent = ex.instruction || 'Perform reps with steady form and breathing.';
    document.getElementById('playerProgressText').textContent = `Exercise ${index + 1} of ${activeWorkoutRoutine.exercises.length}`;
    document.getElementById('playerRepsHint').textContent = ex.reps ? `Target: ${ex.reps}` : `${ex.durationSeconds}s work`;

    timerSecondsLeft = ex.durationSeconds || 30;
    updateTimerUI();
    startTimer();
  }

  function updateTimerUI() {
    playerTimerDisplay.textContent = timerSecondsLeft;
    if (timerSecondsLeft <= 3 && timerSecondsLeft > 0) {
      sound.beep(600, 0.1);
      timerCircle.style.borderColor = '#f59e0b';
    } else {
      timerCircle.style.borderColor = 'var(--primary)';
    }
  }

  function startTimer() {
    clearInterval(timerInterval);
    isTimerRunning = true;
    btnToggleTimer.textContent = '⏸️ Pause';
    btnToggleTimer.className = 'btn btn-primary btn-lg';

    timerInterval = setInterval(() => {
      timerSecondsLeft--;
      updateTimerUI();
      if (timerSecondsLeft <= 0) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        sound.beep(880, 0.25, 'triangle');
        // Auto advance after 1 second
        setTimeout(() => {
          loadExercise(activeExerciseIndex + 1);
        }, 800);
      }
    }, 1000);
  }

  function pauseTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    btnToggleTimer.textContent = '▶️ Resume';
    btnToggleTimer.className = 'btn btn-accent btn-lg';
  }

  function completeWorkoutRoutine() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    playerContent.style.display = 'none';
    playerCelebration.style.display = 'block';
    sound.cheer();

    // Mark daily workout in checklist
    const workoutCheck = appState.checklist.find(c => c.id === 'chk_workout');
    if (workoutCheck && !workoutCheck.done) {
      workoutCheck.done = true;
      renderChecklist();
    }
    saveState();
  }

  // Timer modal controls
  if (btnToggleTimer) {
    btnToggleTimer.addEventListener('click', () => {
      if (isTimerRunning) pauseTimer();
      else startTimer();
    });
  }

  if (btnNextExercise) {
    btnNextExercise.addEventListener('click', () => {
      clearInterval(timerInterval);
      loadExercise(activeExerciseIndex + 1);
    });
  }

  if (btnPrevExercise) {
    btnPrevExercise.addEventListener('click', () => {
      if (activeExerciseIndex > 0) {
        clearInterval(timerInterval);
        loadExercise(activeExerciseIndex - 1);
      }
    });
  }

  if (btnClosePlayer) {
    btnClosePlayer.addEventListener('click', () => {
      clearInterval(timerInterval);
      modalOverlay.classList.remove('active');
    });
  }

  if (btnFinishCelebration) {
    btnFinishCelebration.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
      showToast('🌟 Streak active! Keep up the great work!');
    });
  }

  // Quick Start Today's workout button on Dashboard
  const btnStartTodayWorkout = document.getElementById('btnStartTodayWorkout');
  if (btnStartTodayWorkout) {
    btnStartTodayWorkout.addEventListener('click', () => {
      startWorkoutRoutine(DEFAULT_DATA.workoutPlans[0]);
    });
  }

  // Workout Filter tabs
  const filterPills = document.querySelectorAll('#workoutFilters .goal-pill');
  filterPills.forEach(pill => {
    pill.addEventListener('click', () => {
      filterPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.getAttribute('data-filter');
      renderWorkouts(filter);
    });
  });

  // --- Food Menu Section ---
  function renderFoodMenu(goalKey = 'balanced') {
    appState.currentDietGoal = goalKey;
    saveState();

    const menu = DEFAULT_DATA.foodMenus[goalKey] || DEFAULT_DATA.foodMenus.balanced;
    const headerTitle = document.getElementById('dietHeaderTitle');
    const headerSub = document.getElementById('dietHeaderSub');
    const container = document.getElementById('mealCardsContainer');

    if (headerTitle) headerTitle.textContent = `${menu.icon} ${menu.title}`;
    if (headerSub) headerSub.textContent = menu.subtitle;

    if (!container) return;
    container.innerHTML = '';

    const mealTypes = [
      { key: 'breakfast', label: '🌅 Breakfast' },
      { key: 'lunch', label: '☀️ Lunch' },
      { key: 'snack', label: '🍎 Healthy Snack' },
      { key: 'dinner', label: '🌙 Light Dinner' }
    ];

    mealTypes.forEach(type => {
      const meal = menu.meals[type.key];
      if (!meal) return;

      const card = document.createElement('div');
      card.className = 'meal-card';
      card.innerHTML = `
        <div>
          <div class="meal-badge">${type.label}</div>
          <h4 class="meal-name">${meal.name}</h4>
          <p class="meal-desc">${meal.description}</p>
          <div style="font-size: 0.78rem; color: var(--primary-dark); margin-bottom: 8px;">
            ✨ <strong>Why it helps:</strong> ${meal.benefits}
          </div>
        </div>
        <div class="meal-footer">
          <span>🔥 ${meal.calories}</span>
          <span>💪 ${meal.protein}</span>
        </div>
      `;
      container.appendChild(card);
    });

    // Custom friend meals
    renderCustomMeals();
  }

  function renderCustomMeals() {
    const section = document.getElementById('customMealsSection');
    const list = document.getElementById('customMealsList');
    if (!section || !list) return;

    if (!appState.customMeals || appState.customMeals.length === 0) {
      section.style.display = 'none';
      return;
    }

    section.style.display = 'block';
    list.innerHTML = '';

    appState.customMeals.forEach((meal, idx) => {
      const card = document.createElement('div');
      card.className = 'meal-card';
      card.innerHTML = `
        <div>
          <div class="meal-badge">${meal.type}</div>
          <h4 class="meal-name">${meal.name}</h4>
          <p class="meal-desc">${meal.desc}</p>
        </div>
        <div class="meal-footer">
          <span>${meal.calories || 'Healthy choice'}</span>
          <button class="btn btn-outline btn-sm btn-delete-custom-meal" data-idx="${idx}" style="color: #ef4444; padding: 2px 8px;">Delete</button>
        </div>
      `;

      card.querySelector('.btn-delete-custom-meal').addEventListener('click', (e) => {
        const index = parseInt(e.target.getAttribute('data-idx'));
        appState.customMeals.splice(index, 1);
        saveState();
        renderCustomMeals();
        showToast('Meal removed');
      });

      list.appendChild(card);
    });
  }

  // Diet goal selector pills
  const dietPills = document.querySelectorAll('#dietGoalPills .goal-pill');
  dietPills.forEach(pill => {
    pill.addEventListener('click', () => {
      dietPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const goal = pill.getAttribute('data-goal');
      renderFoodMenu(goal);
    });
  });

  // --- Traffic Light Guide & Quick Recipes ---
  function renderTrafficLightGuide() {
    const greenList = document.getElementById('greenFoodList');
    const yellowList = document.getElementById('yellowFoodList');
    const redList = document.getElementById('redFoodList');

    const data = DEFAULT_DATA.trafficLightGuide;
    if (greenList) {
      greenList.innerHTML = data.green.items.map(item => `<li><span>✅</span> <span>${item}</span></li>`).join('');
    }
    if (yellowList) {
      yellowList.innerHTML = data.yellow.items.map(item => `<li><span>⚠️</span> <span>${item}</span></li>`).join('');
    }
    if (redList) {
      redList.innerHTML = data.red.items.map(item => `<li><span>🚫</span> <span>${item}</span></li>`).join('');
    }
  }

  function renderQuickRecipes() {
    const container = document.getElementById('recipeCardsContainer');
    if (!container) return;
    container.innerHTML = '';

    DEFAULT_DATA.quickRecipes.forEach(recipe => {
      const card = document.createElement('div');
      card.className = 'recipe-card';
      card.innerHTML = `
        <div class="recipe-header">
          <div>
            <span class="badge badge-orange">${recipe.tag}</span>
            <h3 style="font-size: 1.05rem; font-weight: 700; margin-top: 4px;">${recipe.name}</h3>
          </div>
          <span style="font-size: 0.8rem; font-weight: 600; color: var(--primary);">⏱️ ${recipe.time} • ${recipe.difficulty}</span>
        </div>
        
        <div style="margin: 10px 0;">
          <strong style="font-size: 0.85rem;">Ingredients:</strong>
          <ul style="padding-left: 20px; font-size: 0.84rem; color: var(--text-muted); margin-top: 4px;">
            ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-top: 8px;">
          <strong style="font-size: 0.85rem;">Directions:</strong>
          <ol style="padding-left: 20px; font-size: 0.84rem; color: var(--text-muted); margin-top: 4px; line-height: 1.5;">
            ${recipe.steps.map(step => `<li>${step}</li>`).join('')}
          </ol>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // --- Custom Exercise Modal ---
  const exerciseModal = document.getElementById('customExerciseModal');
  const btnOpenCustomExercise = document.getElementById('btnOpenCustomExerciseModal');
  const btnCloseExerciseModal = document.getElementById('btnCloseExerciseModal');
  const customExerciseForm = document.getElementById('customExerciseForm');

  if (btnOpenCustomExercise) {
    btnOpenCustomExercise.addEventListener('click', () => {
      exerciseModal.classList.add('active');
    });
  }

  if (btnCloseExerciseModal) {
    btnCloseExerciseModal.addEventListener('click', () => {
      exerciseModal.classList.remove('active');
    });
  }

  if (customExerciseForm) {
    customExerciseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inputExName').value.trim();
      const target = document.getElementById('selectExTarget').value;
      const duration = parseInt(document.getElementById('inputExDuration').value) || 40;
      const reps = document.getElementById('inputExReps').value.trim() || `${duration}s`;
      const instruction = document.getElementById('inputExInstruction').value.trim() || 'Keep controlled posture and breathe.';

      if (!name) return;

      const newEx = {
        id: 'cust_' + Date.now(),
        name,
        target,
        category: 'Custom',
        durationSeconds: duration,
        reps,
        instruction,
        icon: '⭐'
      };

      if (!appState.customExercises) appState.customExercises = [];
      appState.customExercises.push(newEx);
      saveState();
      renderWorkouts('all');
      exerciseModal.classList.remove('active');
      customExerciseForm.reset();
      showToast(`Added "${name}" to exercises!`);
    });
  }

  // --- Custom Meal Modal ---
  const mealModal = document.getElementById('customMealModal');
  const btnOpenCustomMeal = document.getElementById('btnOpenCustomMealModal');
  const btnCloseMealModal = document.getElementById('btnCloseMealModal');
  const customMealForm = document.getElementById('customMealForm');

  if (btnOpenCustomMeal) {
    btnOpenCustomMeal.addEventListener('click', () => {
      mealModal.classList.add('active');
    });
  }

  if (btnCloseMealModal) {
    btnCloseMealModal.addEventListener('click', () => {
      mealModal.classList.remove('active');
    });
  }

  if (customMealForm) {
    customMealForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('selectMealType').value;
      const name = document.getElementById('inputMealName').value.trim();
      const desc = document.getElementById('inputMealDesc').value.trim() || 'Nutritious wholesome home dish.';
      const calories = document.getElementById('inputMealCalories').value.trim() || 'Healthy dish';

      if (!name) return;

      const newMeal = {
        id: 'meal_' + Date.now(),
        type,
        name,
        desc,
        calories
      };

      if (!appState.customMeals) appState.customMeals = [];
      appState.customMeals.push(newMeal);
      saveState();
      renderCustomMeals();
      mealModal.classList.remove('active');
      customMealForm.reset();
      showToast(`Added "${name}" to friend's menu!`);
    });
  }

  // --- Friend Profile & Settings Form ---
  function initProfileForm() {
    const form = document.getElementById('profileForm');
    const inputName = document.getElementById('inputFriendName');
    const selectGoal = document.getElementById('selectFriendGoal');
    const inputWater = document.getElementById('inputWaterGoal');
    const inputNotes = document.getElementById('inputFriendNotes');
    const btnResetAll = document.getElementById('btnResetAllData');
    const btnPrint = document.getElementById('btnPrintPlan');

    // Populate current values
    if (inputName) inputName.value = appState.profile.name || '';
    if (selectGoal) selectGoal.value = appState.profile.goal || 'get_fit';
    if (inputWater) inputWater.value = appState.profile.dailyWaterGoal || 8;
    if (inputNotes) inputNotes.value = appState.profile.notes || '';

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        appState.profile.name = inputName.value.trim() || 'Friend';
        appState.profile.goal = selectGoal.value;
        appState.profile.dailyWaterGoal = parseInt(inputWater.value) || 8;
        appState.profile.notes = inputNotes.value.trim();

        saveState();
        renderHeaderAndWelcome();
        initWaterTracker();
        showToast('Profile updated for your friend! ✨');
      });
    }

    if (btnResetAll) {
      btnResetAll.addEventListener('click', () => {
        if (confirm('Are you sure you want to reset all app progress and start fresh?')) {
          localStorage.removeItem(STORAGE_KEY);
          appState = getDefaultState();
          saveState();
          location.reload();
        }
      });
    }

    if (btnPrint) {
      btnPrint.addEventListener('click', () => {
        window.print();
      });
    }
  }

  // --- Close modals on backdrop click or ESC key ---
  window.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      clearInterval(timerInterval);
      modalOverlay.classList.remove('active');
    }
    if (e.target === exerciseModal) exerciseModal.classList.remove('active');
    if (e.target === mealModal) mealModal.classList.remove('active');
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay.classList.contains('active')) {
        clearInterval(timerInterval);
        modalOverlay.classList.remove('active');
      }
      if (exerciseModal) exerciseModal.classList.remove('active');
      if (mealModal) mealModal.classList.remove('active');
    }
  });

  // --- App Initialization ---
  function initApp() {
    initTheme();
    initTabs();
    renderHeaderAndWelcome();
    initWaterTracker();
    renderChecklist();
    renderWorkouts('all');
    renderFoodMenu(appState.currentDietGoal || 'balanced');
    renderTrafficLightGuide();
    renderQuickRecipes();
    initProfileForm();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
