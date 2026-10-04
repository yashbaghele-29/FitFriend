// FitFriend Default Data - Workouts, Food Menus, Guidelines & Tips
const DEFAULT_DATA = {
  friendProfile: {
    name: "My Friend",
    goal: "get_fit", // "get_fit", "lose_weight", "build_strength", "clean_eating"
    dailyWaterGoal: 8, // glasses
    notes: "Remember to drink water, stretch after workouts, and stay consistent!"
  },

  quotes: [
    "Small daily improvements over time lead to stunning results.",
    "You don't have to be extreme, just consistent.",
    "Take care of your body. It's the only place you have to live in.",
    "A 30-minute workout is only 2% of your day. No excuses!",
    "Eat food that fuels your energy, not drains it.",
    "The secret of getting ahead is simply getting started."
  ],

  workoutPlans: [
    {
      id: "beginner_fullbody",
      title: "Beginner Full-Body",
      badge: "Easy / Home",
      duration: "15-20 mins",
      difficulty: "Beginner",
      calories: "~120 kcal",
      description: "Gentle, no-equipment workout perfect for beginners to wake up muscles and boost daily stamina.",
      exercises: [
        {
          id: "ex_1",
          name: "Arm Circles & Shoulder Rolls",
          category: "Warm-Up",
          target: "Shoulders & Mobility",
          durationSeconds: 40,
          reps: "20 circles forward, 20 backward",
          instruction: "Stand tall, extend arms straight out, and make controlled circular motions. Great for shoulder warmth.",
          icon: "🔄"
        },
        {
          id: "ex_2",
          name: "Bodyweight Box / Chair Squats",
          category: "Lower Body",
          target: "Thighs & Glutes",
          durationSeconds: 45,
          reps: "3 sets of 10-12 reps",
          instruction: "Stand in front of a chair. Push hips back, bend knees until gently tapping the chair, then stand up and squeeze glutes.",
          icon: "🪑"
        },
        {
          id: "ex_3",
          name: "Incline Wall / Desk Push-Ups",
          category: "Upper Body",
          target: "Chest & Triceps",
          durationSeconds: 45,
          reps: "3 sets of 10-12 reps",
          instruction: "Place hands shoulder-width apart on a sturdy wall or table. Keep body straight like a plank, lower chest, push back up.",
          icon: "🧱"
        },
        {
          id: "ex_4",
          name: "Glute Bridges",
          category: "Core & Lower Body",
          target: "Hips, Glutes & Lower Back",
          durationSeconds: 45,
          reps: "3 sets of 12 reps",
          instruction: "Lie on your back with knees bent and feet flat. Lift your hips toward ceiling, hold for 1 second, then lower slowly.",
          icon: "🌉"
        },
        {
          id: "ex_5",
          name: "Standing Knee-to-Elbow Taps",
          category: "Core",
          target: "Abs & Obliques",
          durationSeconds: 45,
          reps: "20 total reps (10 each side)",
          instruction: "Stand with hands behind head. Lift right knee up toward left elbow, crunching gently, then alternate sides.",
          icon: "⚡"
        },
        {
          id: "ex_6",
          name: "Knee or Forearm Plank Hold",
          category: "Core",
          target: "Full Core Stability",
          durationSeconds: 30,
          reps: "Hold for 20-30 seconds",
          instruction: "Rest on forearms and toes (or knees). Keep straight line from shoulders to heels, engage belly button toward spine.",
          icon: "⏱️"
        },
        {
          id: "ex_7",
          name: "Deep Breathing & Hamstring Stretch",
          category: "Cool Down",
          target: "Flexibility & Recovery",
          durationSeconds: 60,
          reps: "1 minute gentle stretch",
          instruction: "Inhale deeply, reach gently toward toes without forcing, release tension in back and neck.",
          icon: "🧘"
        }
      ]
    },
    {
      id: "cardio_fatburn",
      title: "Fat Burn & Sweat Session",
      badge: "Cardio / Active",
      duration: "15 mins",
      difficulty: "Moderate",
      calories: "~160 kcal",
      description: "Quick, heart-pumping routine to burn calories, increase energy, and sweat without any machines.",
      exercises: [
        {
          id: "cb_1",
          name: "Jumping Jacks (or Step Jacks)",
          category: "Cardio",
          target: "Full Body Cardio",
          durationSeconds: 40,
          reps: "40 seconds active",
          instruction: "Jump feet out while clapping hands overhead. For low-impact: step one foot out at a time.",
          icon: "⭐"
        },
        {
          id: "cb_2",
          name: "High Knees March",
          category: "Cardio",
          target: "Heart Rate & Hip Flexors",
          durationSeconds: 35,
          reps: "35 seconds march or jog",
          instruction: "Pump your arms and drive knees up to waist height in a steady rhythmic pace.",
          icon: "🏃"
        },
        {
          id: "cb_3",
          name: "Mountain Climbers (Slow & Controlled)",
          category: "Core / Cardio",
          target: "Core & Stamina",
          durationSeconds: 35,
          reps: "35 seconds",
          instruction: "In high plank position, drive knees alternately toward chest. Keep back flat and breathe.",
          icon: "🧗"
        },
        {
          id: "cb_4",
          name: "Shadow Boxing Punches",
          category: "Cardio",
          target: "Arms, Shoulders & Cardio",
          durationSeconds: 45,
          reps: "45 seconds rhythmic jabs & crosses",
          instruction: "Slight knee bend, throw light, crisp punches forward while bouncing lightly on balls of feet.",
          icon: "🥊"
        },
        {
          id: "cb_5",
          name: "Skater Hops (Side-to-Side)",
          category: "Cardio",
          target: "Balance & Legs",
          durationSeconds: 40,
          reps: "40 seconds",
          instruction: "Leap gently side to side, swinging opposite arm across like a speed skater. Low impact: step sideways.",
          icon: "⛸️"
        }
      ]
    },
    {
      id: "strength_tone",
      title: "Tone & Strengthen",
      badge: "Muscle & Shape",
      duration: "20 mins",
      difficulty: "Intermediate",
      calories: "~150 kcal",
      description: "Build firm muscles, tighten core, and improve posture with classic bodyweight movements.",
      exercises: [
        {
          id: "st_1",
          name: "Alternating Reverse Lunges",
          category: "Lower Body",
          target: "Quads & Glutes",
          durationSeconds: 45,
          reps: "10 reps each leg",
          instruction: "Take a big step backward, lower both knees to 90 degrees, push through front heel to return.",
          icon: "🦵"
        },
        {
          id: "st_2",
          name: "Floor Knee Push-Ups",
          category: "Upper Body",
          target: "Chest & Arms",
          durationSeconds: 45,
          reps: "10-12 reps",
          instruction: "Knees on mat, hands beneath shoulders. Lower chest to floor with elbows at 45 degree angle.",
          icon: "💪"
        },
        {
          id: "st_3",
          name: "Chair / Bench Dips",
          category: "Upper Body",
          target: "Triceps & Back of Arms",
          durationSeconds: 40,
          reps: "10-12 reps",
          instruction: "Hands on chair edge behind you. Bend elbows to 90 degrees, press straight back up.",
          icon: "💺"
        },
        {
          id: "st_4",
          name: "Superman Back Extensions",
          category: "Back & Posture",
          target: "Lower & Upper Back",
          durationSeconds: 45,
          reps: "12 reps with 2 sec hold",
          instruction: "Lie on stomach. Lift chest and legs slightly off ground together, hold 2s, lower with control.",
          icon: "🦸"
        },
        {
          id: "st_5",
          name: "Calf Raises on Floor Edge",
          category: "Lower Body",
          target: "Calves & Ankle Strength",
          durationSeconds: 40,
          reps: "20 reps",
          instruction: "Raise up high on tiptoes, pause at the top, slowly lower heels down. Feel the burn in calves.",
          icon: "🦶"
        }
      ]
    },
    {
      id: "quick_stretch",
      title: "5-Minute Morning Mobility",
      badge: "Gentle & Fast",
      duration: "5 mins",
      difficulty: "Relaxing",
      calories: "~30 kcal",
      description: "Loosen tight joints, relieve stiff neck or back, and kickstart blood circulation in 5 minutes.",
      exercises: [
        {
          id: "sc_1",
          name: "Cat-Cow Spine Warmup",
          category: "Mobility",
          target: "Spine & Neck",
          durationSeconds: 60,
          reps: "1 minute continuous",
          instruction: "On hands and knees, arch back and look up (Cow), then round back and tuck chin (Cat).",
          icon: "🐈"
        },
        {
          id: "sc_2",
          name: "Child's Pose Rest",
          category: "Stretch",
          target: "Hips, Back & Shoulders",
          durationSeconds: 60,
          reps: "1 minute relaxed hold",
          instruction: "Sit back onto heels, reach hands out in front along floor, rest forehead gently down.",
          icon: "🌸"
        },
        {
          id: "sc_3",
          name: "Standing Chest Opener",
          category: "Stretch",
          target: "Chest & Shoulders",
          durationSeconds: 45,
          reps: "45 seconds hold",
          instruction: "Clasp hands behind back, straighten arms gently, pull shoulder blades together and breathe.",
          icon: "🕊️"
        },
        {
          id: "sc_4",
          name: "Seated Torso Twists",
          category: "Mobility",
          target: "Spine & Core",
          durationSeconds: 45,
          reps: "20 seconds each side",
          instruction: "Sit tall, place right hand on left knee, gently rotate upper body, look over shoulder.",
          icon: "🌀"
        }
      ]
    }
  ],

  foodMenus: {
    balanced: {
      title: "Balanced & Healthy Life",
      subtitle: "Simple, wholesome everyday eating for great energy and fitness",
      icon: "🥗",
      meals: {
        breakfast: {
          name: "Energizing Oatmeal or Eggs with Fruit",
          description: "1 bowl warm rolled oats with sliced banana, a dash of honey & almonds OR 2 boiled eggs + 1 slice whole wheat toast.",
          calories: "320-350 kcal",
          protein: "14-18g",
          benefits: "Sustained morning energy without mid-day crashes."
        },
        lunch: {
          name: "Wholesome Grain & Protein Plate",
          description: "1 cup brown rice or 2 rotis + 1 bowl lentil/dal + fresh grilled chicken/paneer/tofu + crunchy cucumber-tomato salad.",
          calories: "450-520 kcal",
          protein: "22-28g",
          benefits: "Rich in fiber, complex carbs, and lean building blocks."
        },
        snack: {
          name: "Fruit & Nut Boost",
          description: "1 crisp apple or orange + 8-10 almonds or walnuts + a cup of green tea or water.",
          calories: "160 kcal",
          protein: "4g",
          benefits: "Antioxidants and healthy fats to beat the 4 PM slump."
        },
        dinner: {
          name: "Light & Restorative Bowl",
          description: "Stir-fried colorful vegetables with paneer/chicken strips OR vegetable lentil soup with 1 multigrain bread/roti.",
          calories: "350-400 kcal",
          protein: "18-22g",
          benefits: "Gentle on digestion for deep, uninterrupted sleep."
        }
      }
    },
    weight_loss: {
      title: "Fat Loss & Lean Definition",
      subtitle: "High fiber, high protein, low sugar meals to stay full while cutting fat",
      icon: "🔥",
      meals: {
        breakfast: {
          name: "High-Protein Omelet or Besan Chilla",
          description: "2 egg whites + 1 whole egg omelet with tomatoes & spinach (or savory gram flour pancake) + black coffee or green tea.",
          calories: "220-260 kcal",
          protein: "18g",
          benefits: "Controls hunger hormone ghrelin for hours."
        },
        lunch: {
          name: "Big Rainbow Salad & Lean Protein",
          description: "Large bowl of greens, cucumber, carrots, chickpeas or grilled chicken breast with lemon-olive oil dressing (light rice optional).",
          calories: "380-420 kcal",
          protein: "30g",
          benefits: "High volume eating: you feel full on fewer calories."
        },
        snack: {
          name: "Crunchy Makhana or Cucumber Sticks",
          description: "1 bowl roasted foxnuts (makhana) with pinch of salt/pepper OR fresh cucumber & carrot sticks with light curd dip.",
          calories: "90-120 kcal",
          protein: "3-5g",
          benefits: "Zero guilt crunchiness without processed oils."
        },
        dinner: {
          name: "Clear Soup & Steamed Veggies with Protein",
          description: "Steamed broccoli, beans, and bell peppers with grilled fish/tofu/chicken + warm vegetable broth.",
          calories: "280-320 kcal",
          protein: "25g",
          benefits: "Low carb at night speeds up fat oxidation while resting."
        }
      }
    },
    muscle_strength: {
      title: "Strength & Muscle Building",
      subtitle: "Protein-packed nutrition to repair muscles and build healthy shape",
      icon: "💪",
      meals: {
        breakfast: {
          name: "Power Protein Breakfast",
          description: "3 eggs (scrambled or boiled) + 2 slices whole wheat toast with 1 tbsp peanut butter + 1 banana.",
          calories: "450-500 kcal",
          protein: "26g",
          benefits: "Maximum muscle protein synthesis early in the day."
        },
        lunch: {
          name: "Hearty Protein & Grain Feast",
          description: "Large portion of grilled chicken or paneer curry + 1.5 cups brown rice/quinoa + cooked beans/dal + green salad.",
          calories: "600-650 kcal",
          protein: "38-42g",
          benefits: "Replenishes glycogen and fuels muscle repair."
        },
        snack: {
          name: "Peanut Butter Shake or Greek Yogurt",
          description: "1 cup Greek yogurt / curd with honey & pumpkin seeds OR a homemade banana-peanut butter-milk shake.",
          calories: "250-290 kcal",
          protein: "15-20g",
          benefits: "Quick amino acid delivery between main meals."
        },
        dinner: {
          name: "Recovery Dinner",
          description: "Grilled chicken breast, salmon, or grilled paneer steak with baked sweet potato and steamed green beans.",
          calories: "480-530 kcal",
          protein: "34-38g",
          benefits: "Slow-digesting protein and carbs for overnight recovery."
        }
      }
    },
    vegetarian: {
      title: "100% Vegetarian & Plant Power",
      subtitle: "Nutrient-dense plant-based dishes rich in plant protein and vitamins",
      icon: "🌱",
      meals: {
        breakfast: {
          name: "Sprouted Moong / Besan Chilla with Mint Chutney",
          description: "2 warm lentil pancakes with grated vegetables and coriander-mint chutney OR soaked chia seed pudding with fruits.",
          calories: "280-320 kcal",
          protein: "14g",
          benefits: "Easy to digest, rich in iron, zinc, and fiber."
        },
        lunch: {
          name: "Paneer / Tofu Tikka Bowl with Dal & Rice",
          description: "1 cup cooked lentils (tadka dal) + 100g grilled spiced paneer or tofu + 1 cup brown rice or 2 rotis + fresh salad.",
          calories: "480-520 kcal",
          protein: "24-28g",
          benefits: "Complete plant protein pairing (grains + legumes + dairy/soy)."
        },
        snack: {
          name: "Spiced Roasted Chickpeas & Herbal Tea",
          description: "1 small cup crunchy roasted chana (chickpeas) + chamomile or ginger tea.",
          calories: "140 kcal",
          protein: "7g",
          benefits: "High fiber snack that stabilizes blood sugar."
        },
        dinner: {
          name: "Palak (Spinach) & Cottage Cheese / Tofu Sauté",
          description: "Fresh warm spinach curry with cubed paneer/tofu + 1 multigrain roti or quinoa + sliced cucumber.",
          calories: "340-380 kcal",
          protein: "18-20g",
          benefits: "Loaded with magnesium, folate, and calcium."
        }
      }
    }
  },

  trafficLightGuide: {
    green: {
      title: "Eat Freely (Every Day)",
      color: "#10b981",
      badge: "Best Fuel",
      items: [
        "Water (Aim for 2 to 3 liters daily)",
        "Fresh green leafy vegetables (Spinach, Lettuce, Methi)",
        "Cruciferous veggies (Broccoli, Cauliflower, Cabbage)",
        "Eggs & egg whites (high biological value protein)",
        "Lentils, beans, sprouts, and chickpeas",
        "Whole fresh fruits (Apples, Berries, Oranges, Papaya)",
        "Lean proteins (Chicken breast, fish, tofu, cottage cheese)",
        "Herbal teas and green tea without sugar"
      ]
    },
    yellow: {
      title: "Enjoy in Moderation (Portion Control)",
      color: "#f59e0b",
      badge: "Watch Portions",
      items: [
        "Whole grains (Brown rice, oats, whole wheat rotis)",
        "Starchy vegetables (Sweet potatoes, potatoes, corn)",
        "Nuts and seeds (Almonds, walnuts, chia seeds - 1 small fist)",
        "Natural peanut butter or almond butter (1-2 tablespoons)",
        "Cooking oils & ghee (stick to 1-2 teaspoons per meal)",
        "Dairy milk and cheeses (moderate portions)",
        "100% natural fruit juices (prefer whole fruits with fiber)"
      ]
    },
    red: {
      title: "Limit or Avoid (Treats Only)",
      color: "#ef4444",
      badge: "Slow Down Progress",
      items: [
        "Sugary soft drinks, energy drinks, and sweetened iced teas",
        "Deep-fried snacks (Chips, fries, pakoras, samosas)",
        "Bakery desserts, pastries, donuts, and white sugar candies",
        "Processed ready-to-eat noodles and junk food",
        "Heavy late-night greasy takeout meals",
        "Excessive alcohol (empty calories and ruins muscle recovery)"
      ]
    }
  },

  quickRecipes: [
    {
      name: "5-Minute High-Protein Salad",
      time: "5 Mins",
      difficulty: "Super Easy",
      tag: "Lunch / Dinner",
      ingredients: [
        "1 can chickpeas (rinsed) or 100g diced paneer/tofu",
        "1 diced cucumber and 1 diced tomato",
        "Handful fresh coriander/parsley",
        "1 tbsp olive oil, juice of 1/2 lemon, pinch of salt & pepper"
      ],
      steps: [
        "Toss diced veggies and chickpeas/paneer in a bowl.",
        "Drizzle olive oil and squeeze fresh lemon juice.",
        "Add salt, black pepper, and herbs. Toss and enjoy instantly!"
      ]
    },
    {
      name: "Superfood Morning Oatmeal",
      time: "6 Mins",
      difficulty: "Super Easy",
      tag: "Breakfast",
      ingredients: [
        "1/2 cup rolled oats",
        "1 cup water or milk (dairy or almond)",
        "1 sliced banana",
        "1 tsp chia seeds or chopped almonds, pinch of cinnamon"
      ],
      steps: [
        "Simmer oats and milk/water in a small pot for 4-5 minutes until creamy.",
        "Pour into a bowl and top with sliced banana and cinnamon.",
        "Sprinkle chia seeds and almonds on top for crunch!"
      ]
    },
    {
      name: "Soothing Evening Veggie Soup",
      time: "10 Mins",
      difficulty: "Easy",
      tag: "Dinner",
      ingredients: [
        "1 cup mixed chopped veggies (carrots, beans, corn, peas)",
        "2 cups water or vegetable stock",
        "1/2 tsp crushed black pepper, 1 tsp olive oil or butter",
        "Fresh ginger (grated) and salt to taste"
      ],
      steps: [
        "Heat oil in pot, sauté grated ginger for 30 seconds.",
        "Add mixed vegetables and stir for 2 minutes.",
        "Add water/stock and salt. Bring to a gentle boil for 6-8 minutes. Finish with black pepper!"
      ]
    }
  ]
};
