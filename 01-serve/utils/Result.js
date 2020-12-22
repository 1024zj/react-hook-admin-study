

exports.Success = (msg = '操作成功', code = 200, ob = {}, isShow = false) => {

    return {
        msg,
        code: code,
        ob,
        isShow
    }
}

// 参数错误，请检查传递的参数
exports.MError = (msg = '参数等发生错误', code = 500, ob = {}, isShow = false) => {
    return {
        msg,
        code: 500,
        isShow
    }
}