// Tab yönetimi
const tabs = document.querySelectorAll('.tab-btn');
const contents = {
  calculator: document.getElementById('calculator'),
  bmi: document.getElementById('bmi-calculator'),
  water: document.getElementById('water-tracker')
};

// Başlangıçta kalori hesaplama formunu göster, diğerlerini gizle
Object.keys(contents).forEach(key => {
  if (key === 'calculator') {
    contents[key].classList.remove('hidden');
  } else {
    contents[key].classList.add('hidden');
  }
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Aktif tab'ı güncelle
    tabs.forEach(t => {
      t.classList.remove('active', 'text-green-600', 'bg-green-100');
      t.classList.add('text-gray-600');
    });
    tab.classList.add('active', 'text-green-600', 'bg-green-100');
    tab.classList.remove('text-gray-600');

    // İçerikleri göster/gizle
    Object.keys(contents).forEach(key => {
      if (key === tab.dataset.tab) {
        contents[key].classList.remove('hidden');
      } else {
        contents[key].classList.add('hidden');
      }
    });
  });
});

// Kalori hesaplama
document.getElementById("calculator").addEventListener("submit", function (e) {
  e.preventDefault();
  const gender = this.gender.value;
  const age = +this.age.value;
  const height = +this.height.value;
  const weight = +this.weight.value;
  const activity = +this.activity.value;
  const goal = +this.goal.value;

  let bmr;
  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }
  const maintenance = Math.round(bmr * activity);
  const calories = maintenance + goal;

  const protein = Math.round((calories * 0.25) / 4);
  const carbs = Math.round((calories * 0.5) / 4);
  const fat = Math.round((calories * 0.25) / 9);

  // Animasyonlu sonuç gösterimi
  const results = document.getElementById("results");
  results.classList.remove("hidden");

  // Sayıları animasyonlu göster
  animateNumber("calories", calories);
  animateNumber("protein", protein);
  animateNumber("carbs", carbs);
  animateNumber("fat", fat);

  // Progress bar animasyonu
  const progressBar = document.querySelector('.progress-bar');
  progressBar.style.width = '100%';

  // BMI hesapla ve göster
  const bmi = calculateBMI(weight, height);
  document.getElementById('bmi-value').textContent = bmi.toFixed(1);
  document.getElementById('bmi-category').textContent = getBMICategory(bmi);
});

// BMI kategorisi belirleme
function getBMICategory(bmi) {
  if (bmi < 18.5) return 'Zayıf';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Fazla Kilolu';
  return 'Obez';
}

// BMI hesaplama formu
document.getElementById('bmi-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const weight = +this.weight.value;
  const height = +this.height.value;
  
  const bmi = weight / Math.pow(height / 100, 2);
  
  document.getElementById('bmi-value').textContent = bmi.toFixed(1);
  document.getElementById('bmi-category').textContent = getBMICategory(bmi);
  document.getElementById('bmi-result').classList.remove('hidden');
});

// BMI hesaplama
function calculateBMI(weight, height) {
  return weight / Math.pow(height / 100, 2);
}

// Sayı animasyonu
function animateNumber(elementId, target) {
  const element = document.getElementById(elementId);
  const duration = 1000;
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const animate = () => {
    current += increment;
    if (current >= target) {
      element.textContent = Math.round(target);
    } else {
      element.textContent = Math.round(current);
      requestAnimationFrame(animate);
    }
  };

  animate();
}

// Su takibi
let waterAmount = 0;
const waterAmountElement = document.getElementById('water-amount');
const waterLevel = document.getElementById('water-level');

document.getElementById('add-water').addEventListener('click', () => {
  if (waterAmount < 12) {
    waterAmount++;
    updateWaterUI();
  }
});

document.getElementById('remove-water').addEventListener('click', () => {
  if (waterAmount > 0) {
    waterAmount--;
    updateWaterUI();
  }
});

function updateWaterUI() {
  waterAmountElement.textContent = waterAmount;
  const percentage = (waterAmount / 12) * 100;
  waterLevel.style.height = `${percentage}%`;
}
