const $siteList = $('.siteList')
const $add = $siteList.find('.addButton')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
var i = 0;
const hashMap = xObject || [
    {
        logo: 'A',
        url: 'https://douban.com',
        text: '豆瓣'
    },
    {
        logo: 'B',
        url: 'https://bilibili.com',
        text: 'b站'
    }]

const render = () => {
    $siteList.find('li:not(.addButton)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`
    <li>
        <div class="site">
            <div class='circle'></div>
            <div class="logo">
                <div class='circle'>
                    <img src="${node.url}/favicon.ico" class='logo2'></img>
                </div>
            </div>
            <div class="link">${node.text}</div>
            <div class='amend' title='修改'>
                <svg class="icon">
                    <use xlink:href="#icon-xiugai"></use>
                </svg>
            </div>
        </div>
    </li > `).insertBefore($add)
        $li.on('click', () => {
            window.open(node.url)
        })
        $li.on('click', '.amend', function (e) {
            e.stopPropagation()
            window.i = index
            $('#diy-webpage').addClass('show')
            render()

            $('#background').addClass('lucency')
            if (!$('#delete').hasClass('del')) {
                $('#delete').addClass('del')
                $('#delete').removeAttr('disabled')
            }
        })
    })
}

render()
$('.addButton')
    .on('click', function () {
        $('#background').addClass('lucency')
        $('#diy-webpage').addClass('show')
    })

$('#delete').on('click', () => {
    hashMap.splice(window.i, 1)

    $('.show').removeClass('show')
    $('#background').removeClass('lucency')
    render()
})

$('#cancel').on('click', () => {
    $('.show').removeClass('show')
    $('#delete').removeClass('del')
    $('#background').removeClass('lucency')
})


$('.url').on('input', () => {
    if ($('.url').val() !== '') {
        $('#done').addClass('blue')
    } else {
        $('#done').removeClass('blue')
    }

})



$('#done').on('click', function (e) {

    e.stopPropagation();
    if (!$(this).hasClass('blue')) {
        return
    }
    $('.done').removeAttr('disabled');


    if ($('#delete').hasClass('del')) {
        let url
        if ($('.url').val().indexOf('https') !== 0) {
            url = 'https://' + $('.url').val()
        }

        if ($('.url').val() !== '') {
            hashMap[window.i] = {
                logo: url + '/favicon.ico',
                text: $('.name').val(),
                url: url
            }
        } else { return }
        render()
        $('.show').removeClass('show')
        $('#background').removeClass('lucency')


    } else {
        let url
        if ($('.url').val().indexOf('https') !== 0) {
            url = 'https://' + $('.url').val()
        }
        if ($('.url').val() !== '') {
            hashMap.push({
                logo: url + '/favicon.ico',
                text: $('.name').val(),
                url: url
            })
        } else { return }
        render()
        $('.show').removeClass('show')
        $('#background').removeClass('lucency')

    }
})



$('.addButton').on('click', () => {
    $('.dialog-title').text('添加快捷方式')
})

$('.amend').on('click', () => {
    $('.dialog-title').text('修改快捷方式')
})

$('.field-input').on('focus', function () {
    $(this).parent().next().addClass('newStyle')
})
$('.field-input').on('blur', function () {
    $(this).parent().next().removeClass('newStyle')
})
$('.name').on('focus', () => {
    $('#name').addClass('font-color')
})
$('.name').on('blur', () => {
    $('#name').removeClass('font-color')
})
$('.url').on('focus', () => {
    $('#website').addClass('font-color')
})
$('.url').on('blur', () => {
    $('#website').removeClass('font-color')
})
$('.cancel').on('click', function () {
    $(this).addClass('protuberance')
})


// window.onbeforeunload = () => {
//     const string = JSON.stringify(hashMap)
//     window.localStorage.setItem('x', string)
// }