
const expenseForm = document.getElementById('expense-form');
const categoryFilter = document.getElementById('category-filter');
const expenseList = document.getElementById('expense-list');
const totalExpenses = document.getElementById('total-expenses');
let expenses = [];

function playSound(soundFile) {
  const audio = new Audio(soundFile);
  audio.play();
}

expenseForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const expenseName = document.getElementById('expense-name').value;
  const expenseAmount = parseFloat(document.getElementById('expense-amount').value);
  const expenseCategory = document.getElementById('expense-category').value;

  const expense = {
    name: expenseName,
    amount: expenseAmount,
    category: expenseCategory,
    timestamp: new Date().toLocaleString(),
  };

  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateExpenses();
});

function updateExpenses() {
  expenseList.innerHTML = '';
  const selectedCategory = categoryFilter.value;
  const filteredExpenses = (selectedCategory !== 'all') ? expenses.filter(expense => expense.category === selectedCategory) : expenses;

  filteredExpenses.forEach((expense, index) => {
    const card = createCard(expense, 'bg-gray-100', deleteExpense);
    expenseList.appendChild(card);
  });

  const total = filteredExpenses.reduce((acc, curr) => acc + curr.amount, 0);
  totalExpenses.textContent = `Total Expenses: ₹${total.toFixed(2)}`;

  // Play sound only if there are actual updates
 
    playSound('Asset/add.mp3');

}


    function createCard(data, backgroundClass, deleteFunction) {
          const card = document.createElement('div');
          card.className = `${backgroundClass} p-4 rounded-md shadow-md`;
        
          for (const key in data) {
            if (data.hasOwnProperty(key)) {
              const info = document.createElement('p');
              info.className = 'text-lg font-semibold';
              info.textContent = `${key.charAt(0).toUpperCase() + key.slice(1)}: ${data[key]}`;
              card.appendChild(info);
            }
          }

  const deleteButton = document.createElement('button');
  deleteButton.className = 'text-sm text-red-500 underline cursor-pointer';
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => deleteFunction(data));
  card.appendChild(deleteButton);

  return card;
}

function deleteExpense(expense) {
  expenses = expenses.filter(e => e !== expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
  updateExpenses();

  // Play sound only if there are actual updates
  if (expenses.length > 0) {
    playSound('Asset/pop.mp3');
  }
}

categoryFilter.addEventListener('change', updateExpenses);

window.addEventListener('load', () => {
  const storedExpenses = localStorage.getItem('expenses');
  if (storedExpenses) {
    expenses = JSON.parse(storedExpenses);
    updateExpenses();
  }
});

const earningsForm = document.getElementById('earnings-form');
const categoryFilterEarnings = document.getElementById('category-filter-earnings');
const earningsList = document.getElementById('earnings-list');
const totalEarnings = document.getElementById('total-earnings');
let earnings = [];

earningsForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const earningsSource = document.getElementById('earnings-source').value;
  const earningsAmount = parseFloat(document.getElementById('earnings-amount').value);
  const earningsCategory = document.getElementById('earnings-category').value;

  const earningsItem = {
    source: earningsSource,
    amount: earningsAmount,
    category: earningsCategory,
    timestamp: new Date().toLocaleString(),
  };

  earnings.push(earningsItem);
  localStorage.setItem('earnings', JSON.stringify(earnings));
  updateEarnings();
});

function updateEarnings() {
  earningsList.innerHTML = '';
  const selectedCategoryEarnings = categoryFilterEarnings.value;
  const filteredEarnings = (selectedCategoryEarnings !== 'all') ? earnings.filter(earning => earning.category === selectedCategoryEarnings) : earnings;

  filteredEarnings.forEach((earning, index) => {
    const card = createCard(earning, 'bg-green-100', deleteEarning);
    earningsList.appendChild(card);
  });

  const total = filteredEarnings.reduce((acc, curr) => acc + curr.amount, 0);
  totalEarnings.textContent = `Total Earnings: ₹${total.toFixed(2)}`;

  // Play sound only if there are actual updates
  if (filteredEarnings.length > 0) {
    playSound('Asset/add.mp3');
  }
}

function deleteEarning(earning) {
  earnings = earnings.filter(e => e !== earning);
  localStorage.setItem('earnings', JSON.stringify(earnings));
  updateEarnings();

  // Play sound only if there are actual updates
  if (earnings.length > 0) {
    playSound('Asset/pop.mp3');
  }
}

categoryFilterEarnings.addEventListener('change', updateEarnings);

window.addEventListener('load', () => {
  const storedEarnings = localStorage.getItem('earnings');
  if (storedEarnings) {
    earnings = JSON.parse(storedEarnings);
    updateEarnings();
  }
});
// Function to update the earnings distribution by category
function updateEarningsDistribution(containerId, dataArray) {
    const distributionContainer = document.getElementById(containerId);
    distributionContainer.innerHTML = '';
  
    const categories = {};
  
    // Calculate the distribution by category
    dataArray.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + item.amount;
    });
  
    // Display the distribution items
    for (const category in categories) {
      const distributionItem = document.createElement('li');
      distributionItem.textContent = `${category}: ₹${categories[category].toFixed(2)}`;
      distributionContainer.appendChild(distributionItem);
    }
  }
  
  // Function to update the distribution by category
  function updateDistribution(containerId, dataArray) {
    const distributionContainer = document.getElementById(containerId);
    distributionContainer.innerHTML = '';
  
    const categories = {};
  
    // Calculate the distribution by category
    dataArray.forEach(item => {
      categories[item.category] = (categories[item.category] || 0) + item.amount;
    });
  
    // Display the distribution items
    for (const category in categories) {
      const distributionItem = document.createElement('li');
      distributionItem.textContent = `${category}: ₹${categories[category].toFixed(2)}`;
      distributionContainer.appendChild(distributionItem);
    }
  }
  
  // Function to update the net income and distribution
  function updateSummary() {
    const totalExpensesValue = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    const totalEarningsValue = earnings.reduce((acc, curr) => acc + curr.amount, 0);
    const netIncomeValue = totalEarningsValue - totalExpensesValue;
  
    const totalExpensesSpan = document.getElementById('summary-total-expenses');
    const totalEarningsSpan = document.getElementById('summary-total-earnings');
    const netIncomeSpan = document.getElementById('summary-net-income');
  
    totalExpensesSpan.textContent = `₹${totalExpensesValue.toFixed(2)}`;
    totalEarningsSpan.textContent = `₹${totalEarningsValue.toFixed(2)}`;
    
    // Check if net income is below 0 and apply red color if true
    if (netIncomeValue < 0) {
      netIncomeSpan.style.color = 'red';
    } else {
      netIncomeSpan.style.color = ''; // Reset color if not below 0
    }
  
    netIncomeSpan.textContent = `₹${netIncomeValue.toFixed(2)}`;
  
    updateDistribution('expense-distribution', expenses);
    updateEarningsDistribution('earnings-distribution', earnings);
  }
  
  // Update the summary periodically
  setInterval(() => {
    updateSummary();
  }, 5000); // Adjust the interval as needed (here set to 5000 milliseconds or 5 seconds)
  



  function handleFormSubmission(formId, dataCollection, callback) {
    const form = document.getElementById(formId);
  
    form.addEventListener('submit', (event) => {
      event.preventDefault();
  
      // Retrieve form data and handle it as needed
      // For example, you can extract form fields and create an object
      const formData = {};
      const formDataElements = new FormData(form);
      formDataElements.forEach((value, key) => {
        formData[key] = value;
      });
  
      // Assuming you have a function to handle the data
      // For example, addDataToCollection is a placeholder, replace it with your actual function
      addDataToCollection(formData, dataCollection);
  
      // Call the provided callback function
      if (typeof callback === 'function') {
        callback();
      }
    });
  }
  
  // Placeholder function, replace it with your actual function to add data to the collection
  function addDataToCollection(data, collection) {
    collection.push(data);
    // You might want to perform additional operations based on your requirements
    localStorage.setItem('yourCollectionKey', JSON.stringify(collection));
  }
  
  // Initialize the summary update whenever expenses or earnings are updated
  function initializeSummaryUpdate() {
    handleFormSubmission('expense-form', expenses, () => {
      updateExpenses();
      updateSummary();
    });
    handleFormSubmission('earnings-form', earnings, () => {
      updateEarnings();
      updateSummary();
    });
  }
  
  initializeSummaryUpdate();
  