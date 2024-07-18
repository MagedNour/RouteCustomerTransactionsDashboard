let chartInstance = null;
let nameSorted = false;


// Init HomePage
$(document).ready(async function () {

  const { transactionsArray, customersArray } = await getData();

  // Filter by Customer Name
  $('#customer-filter').on('input', function () {
    const filter = this.value.toLowerCase();
    const customerIds = customersArray.filter(c => c.name.toLowerCase().includes(filter)).map(c => c.id);

    const filteredTransactions = transactionsArray.filter(transaction => customerIds.includes(transaction.customer_id));

    displayTransactions(filteredTransactions)
  });

  // Filter by Transaction Amount
  $("#amount-filter").on('input', function () {
    let filter = parseFloat(this.value);
    filter = isNaN(filter) ? 0 : filter;
    const filteredTransactions = transactionsArray.filter(t => filter <= t.amount)
    displayTransactions(filteredTransactions)
  })

  // open Customer's page
  $(document).on('click', '.transactions-row', function () {



    let customer = $(this).find('td').first().text();
    customer = customersArray.find(c => c.name == customer);

    let customerTransactions = transactionsArray.filter(t => t.customer_id === customer.id);
    let totalTransactions = 0;
    customerTransactions.forEach(t => totalTransactions += t.amount)
    customer.transaction = customerTransactions;
    customer.totalTransactions = totalTransactions;


    $("#viewport").empty();
    displayCustomerPage(customer)

  })

  // Return or Reload HomePage
  $(".logo").on('click', () => getData())

  //SortByName ==> adding click
  $("#sortByName").on('click', function () {
    console.log("Hello");
    if(nameSorted){
      displayTransactions(transactionsArray)
      nameSorted = false
      $("#sortByName").css({"color": "gray"})
    }else{
      sortByName([...transactionsArray]);
      $("#sortByName").css({"color": "black"})
    }
    
  })
})

function displayHomePage(transactionsArray, customersArray) {
  $("#viewport").empty();

  let customersCount = customersArray.length;
  let transactionsCount = transactionsArray.length;
  let totalTransactionsAmount = 0;
  transactionsArray.forEach(t => totalTransactionsAmount += t.amount);

  $('#viewport').append(`
  <header>
  
 <div class="flex flex-wrap">
  <div class="p-5 w-full md:w-1/3">
      <div class="bg-white  p-10 rounded-lg shadow-lg mb-6 min-h-full">
          <h1 class="text-2xl font-bold mb-2 flex justify-around">
              <i class="fa-solid fa-users fa-3x"></i>
              <span class="text-3xl mt-5">${customersCount}</span>
          </h1>
          <p class="text-center mt-10 font-semibold text-2xl">Customers</p>
      </div>
  </div>
  <div class="p-5 w-full md:w-1/3">
      <div class="bg-white p-10 rounded-lg shadow-lg mb-6 min-h-full">
          <h1 class="text-2xl font-bold mb-2 flex justify-around">
          <i class="fa-solid fa-hand-holding-dollar fa-3x"></i>
          <span class="text-3xl mt-5">${transactionsCount}</span></h1>
          <p class="text-2xl text-center mt-10"><span class="font-semibold">Total: </span>${totalTransactionsAmount} E£</p>
      </div>
  </div>
  <div class="p-5 w-full md:w-1/3">
      <div class="bg-white p-2 rounded-lg shadow-lg mb-6 min-h-full">
          <h2 class="text-2xl font-bold mb-2 text-center">Transactions Graph</h2>
          <canvas id="totalTransactionChart"></canvas>
      </div>
  </div>
 </div>
 
</header>


<h1 class="my-4 text-2xl font-semibold">Customer Transactions</h1>
<div class="flex space-x-4 mb-4">
  <input type="text" id="customer-filter" class="form-control filter-input w-1/2 px-3 py-2 border rounded-md"
      placeholder="Filter by customer name">
  <input type="number" id="amount-filter" class="form-control filter-input w-1/2 px-3 py-2 border rounded-md"
      placeholder="Filter by transaction amount">
</div>

<table class="w-full mt-10 border-b-2 border-gray-200">
  <thead>
      <tr class="border-b-2">
          <th class="px-4 py-4">Customer Name
          <i class="fa-solid fa-sort ms-2 cursor-pointer transition-colors duration-200 text-gray-400" id ="sortByName"></i>
          </th>
          <th class="px-4 py-4">Transaction Date</th>
          <th class="px-4 py-4">Transaction Amount</th>
      </tr>
  </thead>
  <tbody id="transaction-table-body">
      <!-- Data will be inserted here by JavaScript -->
  </tbody>

</table>
  `)

  displayTransactions(transactionsArray);
}

async function getData() {
  try {
    let api = await fetch('http://localhost:3000/api/data', { method: 'GET' });
    let response = await api.json();
    let customersArray = response.customers;
    let transactionsArray = response.transactions;

    transactionsArray.forEach(trans => {
      trans.name = customersArray.find(c => c.id == trans.customer_id).name;
    })

    displayHomePage(transactionsArray, customersArray)

    return ({ transactionsArray, customersArray });


  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayTransactions(trans) {
  $('#transaction-table-body').empty();

  let allRows = ``

  trans.forEach(trans => {

    allRows += `
          <tr class = "transactions-row cursor-pointer text-center border-b-2 transition-all duration-200 hover:bg-gray-200 hover:font-semibold" >
            <td class= "px-4 py-4 text-blue-500 duration-300 ">${trans.name}</td>
            <td class= "px-4 py-4">${trans.date}</td>
            <td class= " px-4 py-4">${trans.amount}</td>
          </tr>
    `

  });

  $('#transaction-table-body').append(allRows)
  let dataObject = {}
  dataObject.transaction = trans;
  dataObject.home = true;

  createChart(dataObject)


}


function sortByName(dataArray) {

  dataArray.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    } else if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  })

nameSorted = true;

  displayTransactions(dataArray)

}



// Customer Page
function displayCustomerPage(customer) {
  let transactionRows = ``


  for (let i = 0; i < customer.transaction.length; i++) {
    transactionRows += `
    <tr>
        <td class="py-2 px-4 border-b text-center">${customer.transaction[i].date}</td>
        <td class="py-2 px-4 border-b text-center">${customer.transaction[i].amount}</td>
    </tr>
    `
  }

  $("#viewport").append(`
  <div class="p-6 rounded-lg shadow-lg mb-6 flex flex-wrap">

  <div class= "w-full md:w-2/4 mb-5">
  <h1 class="text-2xl font-bold mb-2 me-10">
  <i class="fa-solid fa-user fa-lg text-blue-300 me-3"></i>
  <span>${customer.name}</span>
  </h1>
  </div>
 

  <div class= "w-full md:w-2/4 mb-5">
  <h1 class="text-2xl font-bold mb-2">
  <i class="fa-solid fa-sack-dollar text-green-200 fa-lg me-3"></i>
  Total Amount: 
  <span class="font-light">${customer.totalTransactions} E£</span>
  </h1>
  </div>
  
</div>

<!-- Transactions Table Section -->
<div class="bg-white p-6 rounded-lg shadow-lg mb-6">
  <h2 class="text-xl font-bold mb-4">Transactions</h2>
  <table class="w-2/3 m-auto bg-white">
      <thead>
          <tr>
              <th class="py-2 px-4 border-b">Date</th>
              <th class="py-2 px-4 border-b">Amount</th>
          </tr>
      </thead>
      <tbody id="transactionsTableBody">
          ${transactionRows}
      </tbody>
  </table>

  <p class="text-xl mt-4"> <span class="font-semibold">Total Transactions Amount: </span> <span class=""> ${customer.totalTransactions} E£
  </span></p>


</div>

<!-- Transactions Graph Section -->
<div class="bg-white p-6 rounded-lg shadow-lg">
  <h2 class="text-xl font-bold mb-4">Transactions Graph</h2>
  <canvas id="transactionChart" class="w-2/4 h-60 mx-auto"></canvas>
</div>
</div>
  `)
  createChart(customer)
}


// Create transactions graph
function createChart(dataObject) {

  if (chartInstance != null) {
    chartInstance.destroy();
  }

  //check if the graph is at home or customer's page
  if (dataObject.home) {
    var ctx = document.getElementById('totalTransactionChart').getContext('2d');
    chartType = 'bar'
  } else {
    var ctx = document.getElementById('transactionChart').getContext('2d');
    chartType = 'line'
  }


  chartInstance = new Chart(ctx, {
    type: chartType,
    data: {
      labels: dataObject.transaction.map(transaction => transaction.date),
      datasets: [{
        label: 'Transaction Amount',
        data: dataObject.transaction.map(transaction => transaction.amount),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: '#BFDBFE',
        borderWidth: 1,
        fill: false,
        tension: 0.1
      }]
    },
    options: {
      scales: {
        x: {
          type: 'time',
          time: {
            unit: 'day'
          }
        }
      }

    }
  });
}



