var cheerio = require('cheerio')
var axios = require('axios')

function getPedals(){
    const output = []
    axios.get('https://reverb.com/marketplace?query=tube%20screamer')
        .then(response => {
            const $ = cheerio.load(response.data)

            $('a.csp-square-card__inner').each(function(i, element){
                console.log(i, 
                    $(element)
                    .children()
                    .text()
                )
            })
        })

    return output
}

getPedals()


