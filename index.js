const { json } = require('express')
const express = require('express')

const app = express()
const port = 5000

app.set('view engine', 'hbs') // set view engine hbs
app.use('/assets', express.static(__dirname + '/assets')) // path folder assets
app.use(express.urlencoded({ extended: false }))


let isLogin = true
let dataBlog = []

app.get('/', function (request, response) {
    console.log(dataBlog);

    let data = dataBlog.map(function (item) {
        return {
            ...item,
            // date: getFullTime(item.duration),
            duration: getDistanceTime(new Date(item.startDate), new Date(item.endDate)),
            postAt: getFullTime(new Date())

        }
    })

    response.render('index', { blog: data })
})





app.get('/blog-detail/:index', function (request, response) {
    let index = request.params.index

    let data = dataBlog[index]
    data = {
        title: data.title,
        author: data.author,
        duration: getDistanceTime(new Date(data.startDate), new Date(data.endDate)),
        startDate: data.startDate,
        endDate: data.endDate,
        content: data.content,


    }

    response.render('blog-detail', { data })
})

app.get('/contact', function (request, response) {
    response.render('contact')
})
app.get("/myproject", function (request, response) {
    response.render("myproject");
});


app.post('/myproject', function (request, response) {

    console.log(request.body);
    let title = request.body.inputTitle;
    let startDate = request.body.inputStartDate;
    let endDate = request.body.inputEndDate;
    let content = request.body.inputContent;
    let android = request.body.android;
    let react = request.body.react;
    let nodejs = request.body.nodejs;
    let squarejs = request.body.squarejs;


    console.log(title);
    console.log(startDate);
    console.log(endDate);
    console.log(content);
    console.log(android);
    console.log(react);
    console.log(nodejs);
    console.log(squarejs);

    let blog = {
        title,
        duration: new Date(),
        startDate,
        endDate,
        content,
        android,
        react,
        nodejs,
        squarejs,
        author: "Engkos Kostaman",
    }

    dataBlog.push(blog)

    response.redirect('/')
})
app.get("/update-blog", function (request, response) {
    response.render("update-blog");
});
app.get('/update-blog/:index', function (request, response) {
    let index = request.params.index

    response.render('update-blog', { index })
})

app.post('/update-blog/:index', function (request, response) {

    let index = request.params.index

    dataBlog[index].title = request.body.inputTitle
    dataBlog[index].content = request.body.inputContent
    dataBlog[index].startDate = request.body.inputStartDate
    dataBlog[index].endDate = request.body.inputEndDate
    dataBlog[index].android = request.body.android
    dataBlog[index].react = request.body.react
    dataBlog[index].nodejs = request.body.nodejs
    dataBlog[index].squarejs = request.body.squarejs

    response.redirect('/')
})

app.get('/delete-blog/:index', function (request, response) {
    // console.log(request.params);
    let index = request.params.index
    // console.log(index);
    dataBlog.splice(index, 1)

    response.redirect('/')
})


function getFullTime(time) {
    let month = ["Januari", "Febuari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    let date = time.getDate();
    let monthIndex = time.getMonth();
    let year = time.getFullYear();

    let hours = time.getHours();
    let minutes = time.getMinutes();

    if (hours < 10) {
        hours = "0" + hours;
    } else if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let fullTime = `${date} ${month[monthIndex]} ${year} ${hours}:${minutes} WIB`;
    return fullTime;
}

function getDistanceTime(time, end) {
    let timeNow = end;
    let timePost = time;

    let distance = timeNow - timePost;

    let milisecond = 1000;
    let secondInHours = 3600;
    let hoursInDay = 24;
    let daysInMonth = 30;

    let distanceMonth = Math.floor(distance / (milisecond * secondInHours * hoursInDay * daysInMonth));
    let distanceDay = Math.floor(distance / (milisecond * secondInHours * hoursInDay));
    let distanceHours = Math.floor(distance / (milisecond * 60 * 60));
    let distanceMinutes = Math.floor(distance / (milisecond * 60));
    let distanceSeconds = Math.floor(distance / milisecond);

    if (distanceMonth > 0) {
        return `${distanceMonth} months `;
    } else if (distanceDay > 0) {
        return `${distanceDay} days `;
    } else if (distanceHours > 0) {
        return `${distanceHours} hours `;
    } else if (distanceMinutes > 0) {
        return `${distanceMinutes} minutes`;
    } else {
        return `${distanceSeconds} seconds`;
    }
}


app.listen(port, function () {
    console.log(`server running on port ${port}`);
})