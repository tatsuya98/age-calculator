let button = document.querySelector('.button')
let text = document.querySelectorAll("input[type='text']")
let labels = document.querySelectorAll('.label')

const calculateAge = () =>{
    let date = getCurrentDate()
    let current_date = date.getDate()
    let current_month = date.getMonth() + 1
    let current_year = date.getFullYear()
    let birth_day = getDay().value
    let birth_month = getMonth().value
    let birth_year = getYear().value
    if( isEmptyField() || applyErrorStyles(+birth_year, current_year, +birth_month,+birth_day)){
        return
    }else{
        let months = [31, 28, 31, 30, 31, 30, 31,  
            31, 30, 31, 30, 31 ] 
        if (birth_day > current_date) {  
        current_date = current_date + months[birth_month - 1];  
        current_month = current_month - 1;
        }  
    
        if (birth_month > current_month) {  
        current_year = current_year - 1;  
        current_month = current_month + 12;  
        }  

        let calculated_date = current_date - birth_day;  
        let calculated_month = current_month - birth_month;  
        let calculated_year = current_year - birth_year;
        displayAge(calculated_year, calculated_date, calculated_month)
        variableReset()
    }
}
const displayAge = (calculated_year,calculated_date, calculated_month) =>{
    getYearValue().textContent = calculated_year
    getDayValue().textContent = calculated_date
    getMonthValue().textContent = calculated_month
}

const visualReset = () =>{
    getYearValue().textContent = getMonthValue().textContent = getDayValue().textContent = '--'
    getMonth().style.borderColor = getDay().style.borderColor = getYear().style.borderColor = 'hsl(0, 1%, 44%)'
    getErrorDay().style.display = getErrorMonth().style.display = getErrorYear().style.display = 'none'
    getErrorDay().style.textContent = 'Must be a valid day'
    getErrorMonth().style.textContent = 'Must be a valid month'
    getErrorYear().style.textContent ='Must be in the past'
    labels.forEach(item =>{
        item.style.color = 'hsl(0, 1%, 44%)'
    })
}
const variableReset = () =>{
    button.removeEventListener('click',calculateAge)
    button.addEventListener('click', calculateAge)
    labels.forEach(item =>{
        item.removeEventListener('click', visualReset)
        item.addEventListener('click',visualReset)
    })
}
const getDay = () =>{
    return document.getElementById('day')
}
const getMonth = () =>{
    return document.getElementById('month')
}
const getYear = () =>{
    return document.getElementById('year')
}

const getCurrentDate = () =>{
    return new Date()
}

const getErrorDay = () =>{
    return document.querySelector('.error-day')
}

const getErrorMonth = () =>{
    return document.querySelector('.error-month')
}

const getErrorYear = () =>{
    return document.querySelector('.error-year')
}

const getDayValue = () =>{
    return document.querySelector('.day-value')
}

const getMonthValue = () =>{
    return document.querySelector('.month-value')
}

const getYearValue = () =>{
    return document.querySelector('.year-value')
}

const applyErrorStyles = (birth_year, current_year, birth_month, birth_day) =>{
    if(yearError(birth_year, current_year)){
        getErrorYear().style.display = 'inline'
        getYear().style.borderColor = 'hsl(0, 100%, 67%)'
        labels[2].style.color = 'hsl(0, 100%, 67%)'
         return true
    }else if(monthError(birth_month)){
        getErrorMonth().style.display = 'inline'
        getMonth().style.borderColor = 'hsl(0, 100%, 67%)'
        labels[1].style.color = 'hsl(0, 100%, 67%)'
        return true
    }else if(dayError(birth_day)){
        getErrorDay().style.display = 'inline'
        getDay().style.borderColor = 'hsl(0, 100%, 67%)'
        labels[0].style.color = 'hsl(0, 100%, 67%)'
        return true
    }

}

const isEmptyField = () =>{
    switch(true){
        case (getDay().value.length === 0 && getMonth().value.length === 0 && getYear().value.length === 0):
            getErrorDay().style.display = getErrorMonth().style.display = getErrorYear().style.display = 'inline'
            getErrorDay().textContent =  getErrorMonth().textContent = getErrorYear().textContent = 'This field is required'
            labels[0].style.color = labels[1].style.color = labels[2].style.color = 'hsl(0, 100%, 67%)'
            getDay().style.borderColor = getMonth().style.borderColor = getYear().style.borderColor = 'hsl(0, 100%, 67%)'
            return true
        case (getDay().value.length === 0 && getMonth().value.length === 0):
            getErrorDay().style.display = getErrorMonth().style.display = 'inline'
            getErrorDay().textContent = getErrorMonth().textContent = 'This field is required'
            labels[0].style.color = labels[1].style.color = 'hsl(0, 100%, 67%)'
            getDay().style.borderColor = getMonth().style.borderColor = 'hsl(0, 100%, 67%)'
            return true
        case (getDay().value.length === 0 && getYear().value.length === 0):
            getErrorDay().style.display = getErrorYear().style.display = 'inline'
            getErrorYear().textContent = getErrorDay().textContent = 'This field is required'
            labels[0].style.color = labels[2].style.color = 'hsl(0, 100%, 67%)'
            getDay().style.borderColor =  getYear().style.borderColor = 'hsl(0, 100%, 67%)'
            return true
        case (getMonth().value.length === 0 && getYear().value.length === 0):
            getErrorMonth().style.display = getErrorYear().style.display = 'inline'
            getErrorYear().textContent = getErrorMonth().textContent = 'This field is required'
            labels[1].style.color = labels[2].style.color = 'hsl(0, 100%, 67%)'
            getMonth().style.borderColor = getYear().style.borderColor = 'hsl(0, 100%, 67%)'
            return true
        case getDay().value.length === 0:
            getErrorDay().style.display = 'inline'
            getErrorDay().textContent = 'This field is required'
            labels[0].style.color = 'hsl(0, 100%, 67%)'
            getDay().style.borderColor = 'hsl(0, 100%, 67%)'
            return true
        case getMonth().value.length === 0:
            getErrorMonth().style.display = 'inline'
            getErrorMonth().textContent = 'This field is required'
            labels[1].style.color = 'hsl(0, 100%, 67%)'
            getMonth().style.borderColor = 'hsl(0, 100%, 67%)'
            return true
        case getYear().value.length === 0:
            getErrorYear().style.display = 'inline'
            getErrorYear().textContent = 'This field is required'
            labels[2].style.color = 'hsl(0, 100%, 67%)'
            getYear().style.borderColor = 'hsl(0, 100%, 67%)'
            return true
        default:
            return false
    }
}   

const yearError = (birth_year, current_year) =>{
    return birth_year > current_year
}

const monthError = (birth_month) =>{
    return birth_month > 12 || birth_month < 1
}

const dayError = (birth_day) =>{
    let date = getCurrentDate()
    let numberOfDays = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
    return birth_day > numberOfDays
}

button.addEventListener('click', calculateAge)
text.forEach(item =>{
    item.addEventListener('click', visualReset)
})