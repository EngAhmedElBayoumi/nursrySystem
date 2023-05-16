const puppeteer = require('puppeteer');
const fs = require('fs');

async function generatePDF(html) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });
  const pdf = await page.pdf({ format: 'A4' });
  await browser.close();

  fs.writeFileSync('output.pdf', pdf);
}

exports.reportRoute = (request, response, next) => {
  const html =` <!DOCTYPE html>
  <html>
  
  <head>
    <title>Report Data</title>
    <!--import bootstrap css cdn -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css"
      integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
      table {
        border-collapse: collapse;
        width: 100%;
      }
  
      th,
      td {
        text-align: left;
        padding: 8px;
      }
  
      th {
        background-color: #ddd;
      }
  
      tr:nth-child(even) {
        background-color: #f2f2f2;
      }
  
      .chart-container {
        width: 600px;
        height: 400px;
        margin: auto;
      }
  
      .canvas {
        margin-top: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      /* make this page come from one page when print */
      @media print {
        .report-container {
          page-break-inside: avoid;
        }
      }
    </style>
  </head>
  
  <body class=".report-container">
    <h1 class="header text-center mt-5">
      General Report
    </h1>
    <div class="container mb-5">
      <div class="report-container">
        <div class="row">
          <div class="col-8">
            <div class="report-section">
              <h2 class="mt-5">HR Report</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Total Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Employees</td>
                    <td id="total-employees"></td>
                  </tr>
                  <tr>
                    <td>Total Admins</td>
                    <td id="total-admins"></td>
                  </tr>
                  <tr>
                    <td>Total Basic Admins</td>
                    <td id="total-basic-admins"></td>
                  </tr>
                  <tr>
                    <td>Total Members</td>
                    <td id="total-members"></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-4 canvas">
            <canvas id="HR" width="100" height="100"></canvas>
          </div>
        </div>
        <div class="row">
  
          <div class="col-8">
            <div class="report-section">
              <h2 class="mt-5">Books Report</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Total Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Number of All Books</td>
                    <td id="total-number-of-all-books"></td>
                  </tr>
                  <tr>
                    <td>All Available Books Now</td>
                    <td id="all-available-books-now"></td>
                  </tr>
                  <tr>
                    <td>Total Number of Unique Books</td>
                    <td id="total-number-of-uniuqe-books"></td>
                  </tr>
                </tbody>
              </table>
              <div id="books-categories-chart"></div>
            </div>
          </div>
          <div class="col-4 canvas">
            <canvas id="books" width="100" height="100"></canvas>
          </div>
        </div>
        <div class="row">
          <div class="col-8">
            <div class="report-section">
              <h2 class="mt-5">Transactions Report</h2>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Total Number</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Total Transactions</td>
                    <td id="total-transactions"></td>
                  </tr>
                  <tr>
                    <td>Most Borrowed Books</td>
                    <td id="most-borrowed-books"></td>
                  </tr>
                  <tr>
                    <td>Most Read Books</td>
                    <td id="most-read-books"></td>
                  </tr>
                </tbody>
              </table>
              <div id="operations-chart"></div>
            </div>
  
          </div>
          <div class="col-4 canvas">
            <canvas id="transactions" width="100" height="100"></canvas>
          </div>
        </div>
      </div>
      <script>
      let x = {
        "GeneralFinalReport": {
          "HR_Report": {
            "TotalEmployees": [
              {
                "Total_Number": 4
              }
            ],
            "TotalAdmins": [
              {
                "Total_Number": 4
              }
            ],
            "TotalBasicAdmins": [
              {
                "Total_Number": 2
              }
            ],
            "TotalMembers": [
              {
                "Total_Number": 1
              }
            ]
          },
          "Books_Report": {
            "BooksStatistics": [
              {
                "Total_Number_Of_All_Books": 47,
                "All_Available_Books_Now": 47,
                "Total_Number_Of_Uniuqe_Books": 8
              }
            ],
            "BooksCategoriesStatistics": [
              {
                "_id": "Action",
                "Total_Number_Of_Books": 7
              },
              {
                "_id": "Horror",
                "Total_Number_Of_Books": 1
              }
            ]
          },
          "Transactions_Report": {
            "TransactionsStatistics": [
              {
                "Total_Transactions": 8
              }
            ],
            "OperationsStatistics": [
              {
                "_id": "borrow",
                "Total_Number_Of_Operation": 2
              },
              {
                "_id": "read",
                "Total_Number_Of_Operation": 6
              }
            ],
            "MostReadBooks": [
              {
                "_id": 5,
                "Total_Number_Of_Operation": 1
              },
              {
                "_id": 12,
                "Total_Number_Of_Operation": 1
              },
              {
                "_id": 2,
                "Total_Number_Of_Operation": 1
              }
            ],
            "MostBorrowedBooks": [
              {
                "_id": 1,
                "Total_Number_Of_Operation": 2,
                "title": []
              }
            ]
          }
        }
      };

        const reportData = x;

        // hr report 
        const hrReport = reportData.GeneralFinalReport.HR_Report;
        const totalEmployees = hrReport.TotalEmployees[0].Total_Number;
        const totalAdmins = hrReport.TotalAdmins[0].Total_Number;
        const totalBasicAdmins = hrReport.TotalBasicAdmins[0].Total_Number;
        const totalMembers = hrReport.TotalMembers[0].Total_Number;
        //bar chart for hr report in canvas with id HR
        const ctx = document.getElementById('HR').getContext('2d');
        const myChart = new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Total Employees', 'Total Admins', 'Total Basic Admins', 'Total Members'],
            datasets: [{
              label: 'Numbers',
              data: [15, 16, 20, 1],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
  
        // books report
        const booksReport = reportData.GeneralFinalReport.Books_Report;
        const booksStatistics = booksReport.BooksStatistics[0];
        const booksCategoriesStatistics = booksReport.BooksCategoriesStatistics;

        // transactions report
        const transactionsReport = reportData.GeneralFinalReport.Transactions_Report;
        const transactionsStatistics = transactionsReport.TransactionsStatistics[0];
        const operationsStatistics = transactionsReport.OperationsStatistics;
        const mostReadBooks = transactionsReport.MostReadBooks;
        const mostBorrowedBooks = transactionsReport.MostBorrowedBooks;
        //pie chart for transactions report in canvas with id transactions
        const ctx1 = document.getElementById('transactions').getContext('2d');
        const myChart1 = new Chart(ctx1, {
          type: 'pie',
          data: {
            labels: ['Borrow', 'Read'],
            datasets: [{
              label: 'Numbers',
              data: [2, 6],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
        // books statistics
        const totalNumberOfAllBooks = booksStatistics.Total_Number_Of_All_Books;
        const allAvailableBooksNow = booksStatistics.All_Available_Books_Now;
        const totalNumberOfUniuqeBooks = booksStatistics.Total_Number_Of_Uniuqe_Books;
        // bar chart
        const ctx2 = document.getElementById('books').getContext('2d');
        const myChart2 = new Chart(ctx2, {
          type: 'bar',
          data: {
            labels: ['Total Number Of All Books', 'All Available Books Now', 'Total Number Of Uniuqe Books'],
            datasets: [{
              label: 'Numbers',
              data: [12, 6, 2],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)'
              ],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
        
  
        // put the data in his place in report.html
  
        // hr report
        document.getElementById('total-employees').innerHTML = totalEmployees;
        document.getElementById('total-admins').innerHTML = totalAdmins;
        document.getElementById('total-basic-admins').innerHTML = totalBasicAdmins;
        document.getElementById('total-members').innerHTML = totalMembers;
  
  
        // books report
        document.getElementById('total-number-of-all-books').innerHTML = totalNumberOfAllBooks;
        document.getElementById('all-available-books-now').innerHTML = allAvailableBooksNow;
        document.getElementById('total-number-of-uniuqe-books').innerHTML = totalNumberOfUniuqeBooks;
  
        // transactions report
        document.getElementById('total-transactions').innerHTML = transactionsStatistics.Total_Transactions;
        document.getElementById('most-borrowed-books').innerHTML = operationsStatistics[0].Total_Number_Of_Operation;
        document.getElementById('most-read-books').innerHTML = operationsStatistics[1].Total_Number_Of_Operation;
  
  
  
  
  
  
      </script>
  </body>
  
  </html>
  `;

  generatePDF(html);

  response.status(200).json({ done: "done" });
};
