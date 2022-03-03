module.exports = (request, response) => {
    // remove queries from the url, turn "/posts?id=0" into "/posts"
    const url = request.url.split("?")[0]
    switch(url){
        case "/posts":
            const id = request.query.searchParams.get("snum")
            response.statusCode = 200
            response.setHeader("Content-Type", "application/json")
            request.students[snum] = request.body
            response.write(JSON.stringify(request.students[snum]))
            response.end()
            break
        // response for unexpected get requests
        default:
            response.statusCode = 400
            response.write(`CANNOT PUT ${request.url}`)
            response.end()
            break
    }
}