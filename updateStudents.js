module.exports = (request, response) => {
    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = request.url.split("?")[0]
    switch(url){
        case "/posts:id":
            const id = url.searchParams.get("id")
            response.statusCode = 200
            response.setHeader("Content-Type", "application/json")
            request.students[id] = request.body.snum
            response.write(JSON.stringify(request.students[id]))
            response.end()
            break
       
        default:
            response.statusCode = 400
            response.write(`CANNOT PUT ${url}`)
            response.end()
            break
    }
}
