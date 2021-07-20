const requestURL = 'https://psychologist-1976-default-rtdb.europe-west1.firebasedatabase.app/results.json'

class TestResults {
  static create(results) {
    return fetch(requestURL, {
      method: 'POST',
      body: JSON.stringify(results),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        results.id = response.name
        console.log(results)
        return response
      })
  }

  static fetch(token) {
    /*  if (!token) {
      console.log('123')
      return Promise.resolve(`<p class = "error"> Wrong email or password </p>`)
    } else {
      document.querySelector('.auth-form').style.display = 'none'
      document.querySelector('.auth-success').style.display = 'block'
    } */
    return fetch(
      `https://psychologist-1976-default-rtdb.europe-west1.firebasedatabase.app/results.json?auth=${token}`
    ).then((response) => response.json())
  }

  static get() {
    return fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((response) => {
        return response
      })
  }
}

const resultsLoad = document.querySelector('#load-result-from-database')
const resultsLoadPlace = document.querySelector('.load-result-table')
const testSelected = document.querySelector('.selected-test')
const tableAnswersPlace = document.querySelector('.questions-answers')

let baseResult, testsDataBase

/* resultsLoad.addEventListener('click', () => {
  baseResult = TestResults.get('GET', requestURL).then((response) => {
    testsDataBase = response ? Object.keys(response).map((key) => ({ ...response[key], id: key })) : []
    // console.log('внешние данные', testsDataBase)
    resultsLoadPlace.innerHTML = databaseRender(testsDataBase)
    const databaseChoose = document.getElementsByTagName('p')

    for (let i = 0; i < databaseChoose.length; i++) {
      databaseChoose[i].addEventListener('click', () => {
        testSelected.innerHTML = `
          <p> ${testsDataBase[i].name}  </p>
          <p> ${testsDataBase[i].date}</p><hr>
          <p> ${testsDataBase[i].test1.testResult || ''}</p><hr>
          <p> ${testsDataBase[i].test2.testResult || ''}</p><hr>
          <p> ${testsDataBase[i].test3.testResult || ''}</p><hr>
          <p> ${testsDataBase[i].test4.testResult || ''}</p><hr>  
          <p> ${testsDataBase[i].test5.testResult || ''}</p><hr>
          <p> ${testsDataBase[i].test6.testResult || ''}</p>          
        `
      })
    }
  })
}) */

function databaseLoad() {
  baseResult = TestResults.get('GET', requestURL).then((response) => {
    testsDataBase = response ? Object.keys(response).map((key) => ({ ...response[key], id: key })) : []
    // console.log('внешние данные', testsDataBase)
    resultsLoadPlace.innerHTML = databaseRender(testsDataBase)
    const databaseChoose = document.querySelectorAll('.result-item')

    for (let i = 0; i < databaseChoose.length; i++) {
      databaseChoose[i].addEventListener('click', () => {
        tableAnswersPlace.innerHTML = `<p> Тут будет расшифровка ответов</p>`
        testSelected.innerHTML = `
          <p class="test-title"> Ключ клієнта: <span class="user-key">${testsDataBase[i].name}</span>  </p>
          <p class="test-title"> Дата теста: <span class="user-data">${testsDataBase[i].date}</span></p><hr>
          <p class='test-name'> ${testsDataBase[i].test1.testName}</p>
          <p> ${testsDataBase[i].test1.testResult || ''}</p><hr>
          <p class='test-name'> ${testsDataBase[i].test2.testName}</p>
          <p> ${testsDataBase[i].test2.testResult || ''}</p><hr>
          <p class='test-name'> ${testsDataBase[i].test3.testName}</p>
          <p> ${testsDataBase[i].test3.testResult || ''}</p><hr>
          <p class='test-name'> ${testsDataBase[i].test4.testName}</p>
          <p> ${testsDataBase[i].test4.testResult || ''}</p><hr>  
          <p class='test-name'> ${testsDataBase[i].test5.testName}</p>
          <p> ${testsDataBase[i].test5.testResult || ''}</p><hr>
          <p class='test-name'> ${testsDataBase[i].test6.testName}</p>
          <p> ${testsDataBase[i].test6.testResult || ''}</p>
        `
        const testAnswersLoad = document.querySelectorAll('.test-name')
        for (let j = 0; j < testAnswersLoad.length; j++) {
          testAnswersLoad[j].addEventListener('click', () => {
            switch (j) {
              case 0:
                if (testsDataBase[i].test1.answers) {
                  tableAnswersPlace.innerHTML =
                    testsDataBase[i].test1.testName + tableAnswersRender(testsDataBase[i].test1.answers)
                  break
                }
                tableAnswersPlace.innerHTML = `<h2>${testsDataBase[i].test1.testName} - немає даних</h2>`
                break
              case 1:
                if (testsDataBase[i].test2.answers) {
                  tableAnswersPlace.innerHTML =
                    testsDataBase[i].test2.testName + tableAnswersRender(testsDataBase[i].test2.answers)
                  break
                }
                tableAnswersPlace.innerHTML = `<h2>${testsDataBase[i].test2.testName} - немає даних</h2>`
                break
              case 2:
                if (testsDataBase[i].test3.answers) {
                  tableAnswersPlace.innerHTML =
                    testsDataBase[i].test3.testName + tableAnswersRender(testsDataBase[i].test3.answers)
                  break
                }
                tableAnswersPlace.innerHTML = `<h2>${testsDataBase[i].test3.testName} - немає даних</h2>`
                break
              case 3:
                if (testsDataBase[i].test4.answers) {
                  tableAnswersPlace.innerHTML =
                    testsDataBase[i].test4.testName + tableAnswersRender(testsDataBase[i].test4.answers)
                  break
                }
                tableAnswersPlace.innerHTML = `<h2>${testsDataBase[i].test4.testName} - немає даних</h2>`
                break
              case 4:
                if (testsDataBase[i].test5.answers) {
                  tableAnswersPlace.innerHTML =
                    testsDataBase[i].test5.testName + tableAnswersRender(testsDataBase[i].test5.answers)
                  break
                }
                tableAnswersPlace.innerHTML = `<h2>${testsDataBase[i].test5.testName} - немає даних</h2>`

                break
              case 5:
                if (testsDataBase[i].test6.answers) {
                  tableAnswersPlace.innerHTML =
                    testsDataBase[i].test6.testName + tableAnswersRenderDepression(testsDataBase[i].test6.answers)
                  break
                }
                tableAnswersPlace.innerHTML = `<h2>${testsDataBase[i].test6.testName} - немає даних</h2>`
                break
            }
          })
        }
      })
    }
  })
}

function databaseRender(array) {
  let html = `<h2> База даних </h2>`
  array.forEach((el, idx) => {
    html += `<p class="result-item">#${idx + 1} Ключ клієнта: <span class="user-key">${
      el.name
    }</span>  Дата теста:  <span class="user-data">${el.date}</span>  </p>`
  })
  return html
}

function tableAnswersRender(answers) {
  let html
  html = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Вопрос</th>
          <th scope="col">Значение</th>
          <th scope="col">Ответ</th>
        </tr>
      </thead>`
  for (let i = 0; i < answers.length; i++) {
    html += `
      <tbody>
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${answers[i][0]}</td>
          <td>${answers[i][1]}</td>
          <td>${answers[i][2] || ''}</td>
        </tr>
      </tbody>  
      `
  }
  html += `</table>`

  return html
}

function tableAnswersRenderDepression(answers) {
  let html
  html = `
    <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>          
          <th scope="col">Ответ</th>
          <th scope="col">Значение</th>
        </tr>
      </thead>`

  if (typeof answers[0] !== 'string') {
    for (let i = 0; i < answers.length; i++) {
      html += `
      <tbody>
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${answers[i][0]}</td>
          <td>${answers[i][1]}</td>          
        </tr>
      </tbody>  
      `
    }
  } else {
    for (let i = 0; i < answers.length; i++) {
      html += `
      <tbody>
        <tr>
          <th scope="row">${i + 1}</th>
          <td>${answers[i]}</td>
          <td>    </td>                   
        </tr>
      </tbody>  
      `
    }
  }

  html += `</table>`

  return html
}
