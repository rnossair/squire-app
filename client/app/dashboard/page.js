'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import SearchBar from "../Components/Searchbar";
import BoxButton from "../Components/BoxButton";
import SearchResult from "../Components/SearchResult";
import { formatRecipe } from "../Components/formatRecipe";
import ScrollBox from "../Components/ScrollBox";
import Piechart from "../Components/Piechart";


export default function Home() {
  const [userData, setUserData] = useState({})


  useEffect(() => {
    const payload = { "userId": "690fc7733d3f4948a7d89600" }

    fetch("https://squire-app.onrender.com/users/get-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then(res => res.json())
      .then(data => setUserData(data))
      .then(setDailyCalories(userData.targetCalories))
      .catch(err => console.error(err));


  }, [])




  const recipeData = {
    "recipeName": "Asian-Inspired Chicken & Broccoli Stir-fry",
    "totalCalories": 630,
    "proteinGrams": 62,
    "carbGrams": 72,
    "fatGrams": 10,
    "ingredients": [
      "6 oz (about 170g) boneless, skinless chicken breast, thinly sliced",
      "1.5 cups fresh broccoli florets",
      "1 cup cooked white rice (about 1/2 cup uncooked)",
      "2 cloves garlic, minced",
      "1 inch fresh ginger, grated",
      "2 tbsp low-sodium soy sauce",
      "1 tbsp rice vinegar",
      "1 tsp sesame oil",
      "1/4 tsp black pepper",
      "1/4 cup water or low-sodium chicken broth",
      "1 tsp cornstarch (optional, for thickening)"
    ],
    "instructions": [
      "In a small bowl, whisk together soy sauce, rice vinegar, sesame oil, black pepper, and water/broth. If using, dissolve cornstarch in a tablespoon of the liquid mixture and set aside.",
      "Heat a large non-stick skillet or wok over medium-high heat. Add chicken and stir-fry until cooked through and lightly browned, about 4-6 minutes. Remove chicken from the skillet and set aside.",
      "Add broccoli florets to the skillet. If needed, add a tablespoon of water to help steam them. Cook for 3-5 minutes until tender-crisp.",
      "Add minced garlic and grated ginger to the skillet and stir-fry for 30 seconds until fragrant.",
      "Return the cooked chicken to the skillet with the broccoli, garlic, and ginger. Pour the prepared sauce over everything. Bring to a simmer.",
      "If using, stir in the cornstarch slurry and cook for another minute until the sauce thickens slightly.",
      "Serve immediately over the cooked white rice."
    ],
    "matchReason": "This Asian-Inspired Chicken & Broccoli Stir-fry is an excellent choice for you, as it perfectly aligns with your preference for low-fat Asian cuisine and helps you meet your remaining protein goal while staying comfortably within your calorie limit.",
    "funFact": "Chicken breast is not only a lean source of protein, but it also contains B vitamins like niacin and B6, which are crucial for energy metabolism and overall cell function."
  }


  const [searchQuery, setSearchQuery] = useState("");
  const [resultText, setResultText] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [currentRecipe, setCurrentRecipe] = useState(null);




  const handleSearch = (query) => {
    if (!query.trim()) return;

    if (query.toLowerCase().includes("chicken")) {
      setCurrentRecipe(recipeData);
      setResultText(formatRecipe(recipeData));
      setShowResult(true);
    } else {
      setCurrentRecipe(null);
      setResultText(`No matching recipe found for "${query}"`);
      setShowResult(true);
    }
  };


  // Daily goals (placeholder values)
  const [dailyCalories, setDailyCalories] = useState(2500);
  const [dailyProteins, setDailyProteins] = useState(150);
  const [dailyCarbs, setDailyCarbs] = useState(250);
  const [dailyFats, setDailyFats] = useState(40);
  const [userId, setUserId] = useState("");

  // Setting these daily values to user data fetched.
  useEffect(() => {
    if (userData && userData.targetCalories) {
      setDailyCalories(userData.targetCalories)
    }
  }, [userData])
  useEffect(() => {
    if (userData && userData.targetProtein) {
      setDailyProteins(userData.targetProtein)
    }
  }, [userData])
  useEffect(() => {
    if (userData && userData.targetCarbs) {
      setDailyCarbs(userData.targetCarbs)
    }
  }, [userData])
  useEffect(() => {
    if (userData && userData.targetFat) {
      setDailyFats(userData.targetFat)
    }
  }, [userData])
  // useEffect(() => {
  //   if (userData && userData.userId) {
  //     setUserId(userData.userId)
  //   }
  // }, [userData])

  // State for remaining macros
  const [remainingCalories, setRemainingCalories] = useState(dailyCalories);
  const [remainingProteins, setRemainingProteins] = useState(dailyProteins);
  const [remainingCarbs, setRemainingCarbs] = useState(dailyCarbs);
  const [remainingFats, setRemainingFats] = useState(dailyFats);

  // Setting remaining data to upddate to fetched user data.
  useEffect(() => {
    setRemainingCalories(dailyCalories);
  }, [dailyCalories]);
  useEffect(() => {
    setRemainingProteins(dailyProteins);
  }, [dailyProteins]);
  useEffect(() => {
    setRemainingCarbs(dailyCarbs);
  }, [dailyCarbs]);
  useEffect(() => {
    setRemainingFats(dailyFats);
  }, [dailyFats]);

  const addRecipeToDailyIntake = () => {
    if (!currentRecipe) return;

    setRemainingCalories(prev => Math.max(prev - currentRecipe.totalCalories, 0));
    setRemainingProteins(prev => Math.max(prev - currentRecipe.proteinGrams, 0));
    setRemainingCarbs(prev => Math.max(prev - currentRecipe.carbGrams, 0));
    setRemainingFats(prev => Math.max(prev - currentRecipe.fatGrams, 0));
  };

  const calorieData = [
    { name: ' kcal' },
    { name: 'Consumed', value: dailyCalories - remainingCalories },
    { name: 'Remaining', value: remainingCalories },
  ];
  const proteinData = [
    { name: 'g Protein' },
    { name: 'Consumed', value: dailyProteins - remainingProteins },
    { name: 'Remaining', value: remainingProteins },
  ];
  const carbData = [
    { name: 'g Carbs' },
    { name: 'Consumed', value: dailyCarbs - remainingCarbs },
    { name: 'Remaining', value: remainingCarbs },
  ];
  const fatData = [
    { name: 'g Fats' },
    { name: 'Consumed', value: dailyFats - remainingFats },
    { name: 'Remaining', value: remainingFats },
  ];




  return (
    <div className="min-h-screen font-sans dark:bg-light bg-white">
      <main
        className="
          flex flex-col
          items-start
          justify-start
          px-6 sm:px-10 md:px-20 lg:px-40 xl:px-60
          py-10
          space-y-10
        "
      >

        {/* Search and Charts Side by Side */}
        <div className="flex flex-col md:flex-row w-full gap-8 items-start">
          {/* Left: Hello name and search bar */}
          <div className="flex flex-col gap-4 md:w-1/2 w-full">
            <h1
              className="
            text-black
            text-[clamp(1.8rem,4vw,3rem)]
            font-semibold
          "
            >
              Hello, {userData.name} 👋
            </h1>
            <div className="mt-30 max-lg:mt-3 max-lg:mb-3">
              <SearchBar
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onSearch={() => handleSearch(searchQuery)}
              />
            </div>


          </div>

          {/* Right: Pie Charts */}
          <div className="bg-gray-100 p-4 rounded-lg md:w-1/2 w-full">
            <h2 className="font-semibold mb-4">Remaining Daily Macros</h2>

            {/* Layout for charts */}
            <div className="flex flex-col lg:flex-row items-center justify-center gap-6 pb-20">
              {/* Left - Big Calorie Chart */}
              <div className="flex-1 flex justify-center">
                <div className="w-64 h-64">
                  <Piechart data={calorieData} font={1.4} inner={85} outer={125} color={['#a3a3a3', '#22c55e']} />
                </div>
              </div>

              {/* Right - Smaller stacked charts */}
              <div className="flex flex-col gap-0 items-center justify-center max-lg:flex-row">
                <div className="w-32 h-32">
                  <Piechart data={proteinData} font={0.65} color={['#c3c3c3', '#26f7fd']} />
                </div>
                <div className="w-32 h-32">
                  <Piechart data={carbData} font={0.7} color={['#c3c3c3', '#f8ff26ff']} />
                </div>
                <div className="w-32 h-32">
                  <Piechart data={fatData} font={0.7} color={['#c3c3c3', '#ff4c4cff']} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Result of search bar */}
        <div>
          {showResult && currentRecipe && (
            <div className="flex flex-col gap-2 items-center w-full">
              <SearchResult text={resultText} />
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={addRecipeToDailyIntake}
              >
                Add to Daily Intake
              </button>
            </div>
          )}

          {showResult && !currentRecipe && (
            <SearchResult text={resultText} />
          )}
        </div>

        <ScrollBox userId={userId} />
        {/* Button boxes */}
        <div
          className="
            flex flex-wrap justify-center  /* <-- center horizontally */
            gap-4 sm:gap-6 md:gap-8 lg:gap-10
            pt-8 sm:pt-10 md:pt-12
            w-full     
          "
        >
          <BoxButton
            imageSrc="/images/icon1.png"
            title="Profile"
            onClick={() => console.log('Profile clicked!')}
          />
          <BoxButton
            imageSrc="/images/icon2.png"
            title="Messages"
            onClick={() => console.log('Messages clicked!')}
          />
          <BoxButton
            imageSrc="/images/icon3.png"
            title="Settings"
            onClick={() => console.log('Settings clicked!')}
          />
        </div>

      </main>
    </div>
  );
}
