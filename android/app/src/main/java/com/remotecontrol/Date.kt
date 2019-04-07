package com.gaoyu.smarttools.date

object CodeCommand {
    //编码规则
    //起始码S电平宽度为：9000us低电平+4500us高电平
    val startdown = 9000
    val startup = 4500

    //连接码C电平宽度为：600us低电平+20000us高电平
    val connectdown = 600
    val connectup = 20000

    //数据码由0，1组成：
    //0的电平宽度为：600us低电平+600us高电平，
    val zerodown = 600
    val zeroup = 600

    //1的电平宽度为：600us低电平+1600us高电平
    val onedown = 600
    val oneup = 1600

    /**
     * 大数组模块
     * 全部置通用 在替换
     */
    val base = intArrayOf(startdown, startup, //起始码
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //1-3
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //4-6
            onedown, oneup, zerodown, zeroup, zerodown, zeroup, //7-9
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //10-12
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //13-15
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //16-18
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //19-21
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //22-24
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //25-27
            zerodown, zeroup, onedown, oneup, zerodown, zeroup, //28-30
            onedown, oneup, zerodown, zeroup, zerodown, zeroup, //31-33
            onedown, oneup, zerodown, zeroup, //34-35  前35位数据码结束
            connectdown, connectup, //连接码   后32位开始
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //36-38
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //39-41
            zerodown, zeroup, zerodown, zeroup, onedown, oneup, //42-44
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //45-47
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //48-50
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //51-53
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //54-56
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //57-59
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, //60-62
            zerodown, zeroup, //63
            zerodown, zeroup, zerodown, zeroup, zerodown, zeroup, zerodown, zeroup)//64-67(四位检验码)后32位结束

    //校验码--1
    var check_d = onedown
    var check_u = oneup
}