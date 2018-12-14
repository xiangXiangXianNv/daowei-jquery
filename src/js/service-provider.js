$(function () {
    $.get('http://localhost:3000/service',function (dataJson) {
        var dataP = JSON.parse(dataJson);
        const obj = {service:dataP};
        $.get('src/template/service-p.html',function (data) {
            const render = template.compile(data);
            const html = render(obj);
            $('.provider-content').append(html)
        })
    })
});