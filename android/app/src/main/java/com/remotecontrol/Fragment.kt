package com.gaoyu.smarttools.fragment

import android.content.Context
import android.graphics.Typeface
import android.hardware.ConsumerIrManager
import android.os.Build
import android.os.Bundle
import android.support.annotation.RequiresApi
import android.util.DisplayMetrics
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Button
import android.widget.ImageView
import android.widget.TextView

import com.gaoyu.smarttools.R
import com.gaoyu.smarttools.bean.AirBean
import com.gaoyu.smarttools.date.CodeCommand

import android.content.Context.CONSUMER_IR_SERVICE


//需要api大于19与下面if判断用途类似
@RequiresApi(api = Build.VERSION_CODES.KITKAT)
class AirConditionerFragment : Basefragment(), View.OnClickListener {
    //获取红外控制类
    private var IR: ConsumerIrManager? = null
    //判断是否有红外功能
    internal var IRBack: Boolean = false

    private var view: View? = null
    private var tempShow: TextView? = null
    private var airWindDir: TextView? = null
    private var windDirAuto: TextView? = null
    private var windSpeed: TextView? = null
    private var modeShow: TextView? = null
    private var modeCold: ImageView? = null
    private var modeWatted: ImageView? = null
    private var modeAuto: ImageView? = null
    private var modeSupply: ImageView? = null
    private var modeHeating: ImageView? = null
    //开关、度数、模式、自动手动、风向、风量
    private val airBean = AirBean(0, 25, 0, 0, 0, 0)


    @Override
    fun onCreateView(inflater: LayoutInflater, container: ViewGroup, savedInstanceState: Bundle): View? {
        view = inflater.inflate(R.layout.fragment_air, container, false)
        inItEvent()
        inItUI()
        return view
    }


    //初始化事务
    private fun inItEvent() {
        //获取ConsumerIrManager实例
        IR = getActivity().getSystemService(CONSUMER_IR_SERVICE) as ConsumerIrManager

        //如果sdk版本大于4.4才进行是否有红外的功能（手机的android版本）
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
            IRBack = IR!!.hasIrEmitter()
            if (!IRBack) {
                showToast("对不起，该设备上没有红外功能!")
            } else {
                showToast("红外设备就绪")//可进行下一步操作
            }
        }
    }

    //初始化UI
    private fun inItUI() {

        //按钮设置

        val dm = getResources().getDisplayMetrics()
        val screenWidth = dm.widthPixels / 4
        val screenHeight = dm.heightPixels / 10
        Log.e("gaoyu", "宽高$screenWidth$screenHeight")

        val air_power = view!!.findViewById(R.id.btn_air_power) as Button
        air_power.setOnClickListener(this)
        air_power.setWidth(screenWidth)
        air_power.setHeight(screenHeight)

        val air_mode = view!!.findViewById(R.id.btn_air_mode) as Button
        air_mode.setOnClickListener(this)
        air_mode.setWidth(screenWidth)
        air_mode.setHeight(screenHeight)


        val air_tempadd = view!!.findViewById(R.id.btn_air_up) as Button
        air_tempadd.setOnClickListener(this)
        air_tempadd.setWidth(screenWidth)
        air_tempadd.setHeight(screenHeight)

        val air_tempsub = view!!.findViewById(R.id.btn_air_down) as Button
        air_tempsub.setOnClickListener(this)
        air_tempsub.setWidth(screenWidth)
        air_tempsub.setHeight(screenHeight)

        val air_wind_auto_dir = view!!.findViewById(R.id.btn_air_auto) as Button
        air_wind_auto_dir.setOnClickListener(this)
        air_wind_auto_dir.setWidth(screenWidth)
        air_wind_auto_dir.setHeight(screenHeight)

        val air_wind_count = view!!.findViewById(R.id.btn_air_count) as Button
        air_wind_count.setOnClickListener(this)
        air_wind_count.setWidth(screenWidth)
        air_wind_count.setHeight(screenHeight)

        val air_wind_dir = view!!.findViewById(R.id.btn_air_direction) as Button
        air_wind_dir.setOnClickListener(this)
        air_wind_dir.setWidth(screenWidth)
        air_wind_dir.setHeight(screenHeight)

        //显示设置
        val context = getContext()
        val type = Typeface.createFromAsset(context.getAssets(), "fonts/lcd.TTF")
        tempShow = view!!.findViewById(R.id.temp_show) as TextView
        tempShow!!.setTypeface(type)

        modeShow = view!!.findViewById(R.id.text_mode) as TextView
        windSpeed = view!!.findViewById(R.id.text_wind_speed) as TextView
        airWindDir = view!!.findViewById(R.id.wind_dir) as TextView
        windDirAuto = view!!.findViewById(R.id.wind_dir_auto) as TextView

        modeCold = view!!.findViewById(R.id.image_cold) as ImageView
        modeWatted = view!!.findViewById(R.id.image_watted) as ImageView
        modeAuto = view!!.findViewById(R.id.image_auto) as ImageView
        modeSupply = view!!.findViewById(R.id.image_supply) as ImageView
        modeHeating = view!!.findViewById(R.id.image_heating) as ImageView

    }

    /**
     * 点击处理
     *
     * @param v
     */
    @Override
    fun onClick(v: View) {
        //五中模式
        var data: Int
        //关机状态
        if (IRBack == false) {
            showToast("无红外设备！")
            return
        }
        if (airBean.getmPower() === 0x00 && v.getId() !== R.id.btn_air_power) {
            return
        }

        when (v.getId()) {

            R.id.btn_air_mode -> {
                data = airBean.getmMode()
                data++
                if (data > 4) {
                    data = 0
                }
                airBean.setmMode(data)
                SendMsg(airBean)
            }
            R.id.btn_air_power -> {

                if (airBean.getmPower() === 0) {
                    airBean.setmPower(1)
                } else {
                    airBean.setmPower(0)
                }
                //发送消息
                SendMsg(airBean)
            }
            R.id.btn_air_up -> {
                data = airBean.getmTmp()
                data++
                if (data > 30) {
                    data = 16
                }
                airBean.setmTmp(data)
                SendMsg(airBean)
            }
            R.id.btn_air_down -> {
                data = airBean.getmTmp()
                data--
                if (data < 16) {
                    data = 30
                }
                airBean.setmTmp(data)
                SendMsg(airBean)
            }
            R.id.btn_air_auto -> {
                if (airBean.getmenergy() === 0) {
                    airBean.setmenergy(1)
                } else {
                    airBean.setmenergy(0)
                }
                SendMsg(airBean)
            }
            R.id.btn_air_count -> {
                data = airBean.getmWindCount()
                data++
                if (data > 3) {
                    data = 0
                }
                airBean.setmWindCount(data)
                SendMsg(airBean)
            }
            R.id.btn_air_direction -> {
                data = airBean.getmWindDir()
                data++

                if (data > 3) {
                    data = 0
                }
                airBean.setmWindDir(data)
                SendMsg(airBean)
            }
            else -> {
            }
        }
        //不论点击了什么 都要更新UI
        updataAirUI(airBean)
    }


    @Override
    fun onStart() {
        super.onStart()
        updataAirUI(airBean)
    }

    /**
     * 更新UI
     *
     * @param airBean_ui
     */
    fun updataAirUI(airBean_ui: AirBean) {

        if (airBean_ui.getmPower() === 0x01) {

            if (airBean_ui.getmMode() === 0x00) {

                modeShow!!.setText(getString(R.string.air_mode_val) + getString(R.string.air_mode_value_1))
                modeCold!!.setVisibility(View.INVISIBLE)
                modeWatted!!.setVisibility(View.INVISIBLE)
                modeAuto!!.setVisibility(View.VISIBLE)
                modeSupply!!.setVisibility(View.INVISIBLE)
                modeHeating!!.setVisibility(View.INVISIBLE)
                tempShow!!.setText(String.valueOf(airBean_ui.getmTmp()) + getResources().getString(R.string.degree))
            }
            if (airBean_ui.getmMode() === 0x01) {
                modeCold!!.setVisibility(View.VISIBLE)
                modeWatted!!.setVisibility(View.INVISIBLE)
                modeAuto!!.setVisibility(View.INVISIBLE)
                modeSupply!!.setVisibility(View.INVISIBLE)
                modeHeating!!.setVisibility(View.INVISIBLE)
                modeShow!!.setText(getString(R.string.air_mode_val) + getString(R.string.air_mode_value_2))
                tempShow!!.setText(String.valueOf(airBean_ui.getmTmp()) + getResources().getString(R.string.degree))
            }
            if (airBean_ui.getmMode() === 0x02) {
                modeCold!!.setVisibility(View.INVISIBLE)
                modeWatted!!.setVisibility(View.VISIBLE)
                modeAuto!!.setVisibility(View.INVISIBLE)
                modeSupply!!.setVisibility(View.INVISIBLE)
                modeHeating!!.setVisibility(View.INVISIBLE)
                modeShow!!.setText(getString(R.string.air_mode_val) + getString(R.string.air_mode_value_3))
                tempShow!!.setText("")
            }
            if (airBean_ui.getmMode() === 0x03) {
                modeCold!!.setVisibility(View.INVISIBLE)
                modeWatted!!.setVisibility(View.INVISIBLE)
                modeAuto!!.setVisibility(View.INVISIBLE)
                modeSupply!!.setVisibility(View.VISIBLE)
                modeHeating!!.setVisibility(View.INVISIBLE)
                modeShow!!.setText(getString(R.string.air_mode_val) + getString(R.string.air_mode_value_4))
                tempShow!!.setText("")
            }
            if (airBean_ui.getmMode() === 0x04) {
                modeCold!!.setVisibility(View.INVISIBLE)
                modeWatted!!.setVisibility(View.INVISIBLE)
                modeAuto!!.setVisibility(View.INVISIBLE)
                modeSupply!!.setVisibility(View.INVISIBLE)
                modeHeating!!.setVisibility(View.VISIBLE)
                modeShow!!.setText(getString(R.string.air_mode_val) + getString(R.string.air_mode_value_5))
                tempShow!!.setText(String.valueOf(airBean_ui.getmTmp()) + getResources().getString(R.string.degree))
            }
            if (airBean_ui.getmWindCount() === 0x00) {
                windSpeed!!.setText(getString(R.string.air_wind_val) + getString(R.string.air_wind_count_value_1))
            } else if (airBean_ui.getmWindCount() === 0x01) {
                windSpeed!!.setText(getString(R.string.air_wind_val) + getString(R.string.air_wind_count_value_2))
            } else if (airBean_ui.getmWindCount() === 0x02) {
                windSpeed!!.setText(getString(R.string.air_wind_val) + getString(R.string.air_wind_count_value_3))
            } else if (airBean_ui.getmWindCount() === 0x03) {
                windSpeed!!.setText(getString(R.string.air_wind_val) + getString(R.string.air_wind_count_value_4))
            }

            if (airBean_ui.getmWindDir() === 0x00) {
                airWindDir!!.setText(getString(R.string.air_wind_dir) + getString(R.string.air_wind_dir_value_1))

            } else if (airBean_ui.getmWindDir() === 0x01) {
                airWindDir!!.setText(getString(R.string.air_wind_dir) + getString(R.string.air_wind_dir_value_2))

            } else if (airBean_ui.getmWindDir() === 0x02) {
                airWindDir!!.setText(getString(R.string.air_wind_dir) + getString(R.string.air_wind_dir_value_3))

            }

            if (airBean_ui.getmenergy() === 0x00) {
                windDirAuto!!.setText(getString(R.string.air_wind_auto_dir))

            } else if (airBean_ui.getmenergy() === 0x01) {
                windDirAuto!!.setText(getString(R.string.air_wind_auto_energy))
            }

        } else {
            modeCold!!.setVisibility(View.INVISIBLE)
            modeWatted!!.setVisibility(View.INVISIBLE)
            modeAuto!!.setVisibility(View.INVISIBLE)
            modeSupply!!.setVisibility(View.INVISIBLE)
            modeHeating!!.setVisibility(View.INVISIBLE)
            tempShow!!.setText("")
            windSpeed!!.setText("")
            airWindDir!!.setText("")
            windDirAuto!!.setText("")
            modeShow!!.setText(getString(R.string.air_mode_val) + getString(R.string.air_power_off))

        }
    }

    /**
     * 逻辑处理
     * 发送消息
     *
     * @param airBean_Event
     */
    fun SendMsg(airBean_Event: AirBean) {
        Log.e("gaoyu", "要发送的信息" + airBean_Event.toString())

        val mPower = airBean_Event.getmPower() //开关
        val mTmp = airBean_Event.getmTmp()  //温度
        val mMode = airBean_Event.getmMode()  //模式
        val menergy = airBean_Event.getmenergy()  //节能省电/换气
        val mWindDir = airBean_Event.getmWindDir()   //风向
        val mWindCount = airBean_Event.getmWindCount() //风量

        var tmWindDir = 0//二进制方向
        //左右扫风风向判断
        if (mWindDir == 2) {
            tmWindDir = 1
        } else if (mWindDir == 1) {
            tmWindDir = 0
        } else {
            tmWindDir = 0
        }
        //根据所选模式确定检验码
        //校验码 = [(模式 – 1) + (温度 – 16) + 5 +左右扫风+换气+节能]取二进制后四位，再逆序
        //以下为了思路清晰 就不写在一起了
        val check = mMode - 1 + (mTmp - 16) + 5 + tmWindDir + menergy + menergy//十进制数字
        var two_chack = Integer.toBinaryString(check)//转换成二进制
        //如果大于四位进行裁剪
        //补零
        when (two_chack.length()) {
            3 -> two_chack = "0$two_chack"
            2 -> two_chack = "00$two_chack"
            1 -> two_chack = "000$two_chack"
        }
        two_chack = two_chack.substring(two_chack.length() - 4, two_chack.length())//取后四位
        val Cut = StringBuffer(two_chack).reverse().toString()//倒序
        Log.e("gaoyu", "裁剪之前" + two_chack + "裁剪倒序之后" + Cut)

        //分解字符（承载最后四个逆序字符）
        val item = CharArray(5)
        for (i in 0 until Cut.length()) {
            item[i] = Cut.charAt(i)
        }
        //操作大数组
        var base = CodeCommand.base

        //第一步 替换校验码  （分七步）
        //取出数组里的四个数
        val one = Integer.valueOf(String.valueOf(item[0])).intValue()
        val two = Integer.valueOf(String.valueOf(item[1])).intValue()
        val three = Integer.valueOf(String.valueOf(item[2])).intValue()
        val four = Integer.valueOf(String.valueOf(item[3])).intValue()
        //64-67位为校验码 131、132 \ 133、134 \ 135、136 \ 137、138
        //第一个数
        if (one == 1) {
            Log.e("gaoyu", "第一个数是1")
            //将大数组里的130、131位置1
            base[130] = CodeCommand.check_d
            base[131] = CodeCommand.check_u

        } else {
            Log.e("gaoyu", "第一个数是0")
            //将大数组里的64位不用变
        }
        //第二个数
        if (two == 1) {
            Log.e("gaoyu", "第二个数是1")
            //将大数组里的132、133位置1
            base[132] = CodeCommand.check_d
            base[133] = CodeCommand.check_u

        } else {
            Log.e("gaoyu", "第二个数是0")
            //将大数组里的132、133位不用变
        }
        //第三个数
        if (three == 1) {
            Log.e("gaoyu", "第三个数是1")
            //将大数组里的134、135位置1
            base[134] = CodeCommand.check_d
            base[135] = CodeCommand.check_u

        } else {
            Log.e("gaoyu", "第三个数是0")
            //将大数组里的134、135位不用变
        }
        //第四个数
        if (four == 1) {
            Log.e("gaoyu", "第四个数是1")
            //将大数组里的136、137位置1
            base[136] = CodeCommand.check_d
            base[137] = CodeCommand.check_u
        } else {
            Log.e("gaoyu", "第四个数是0")
            //将大数组里的136、137位不用变
        }

        //第二步 开关  8/9
        if (mPower == 1) {
            Log.e("gaoyu", "开")
            base[8] = CodeCommand.onedown
            base[9] = CodeCommand.oneup
        } else {
            base[8] = CodeCommand.zerodown
            base[9] = CodeCommand.zeroup
            Log.e("gaoyu", "关")
        }

        //第三步 温度 16-30度   数组中18、25
        when (mTmp) {
            16 -> {
            }
            17 -> {
                base[18] = CodeCommand.onedown
                base[19] = CodeCommand.oneup
                base[20] = CodeCommand.zerodown
                base[21] = CodeCommand.zeroup
                base[22] = CodeCommand.zerodown
                base[23] = CodeCommand.zeroup
                base[24] = CodeCommand.zerodown
                base[25] = CodeCommand.zeroup
            }
            18 -> {
                base[18] = CodeCommand.zerodown
                base[19] = CodeCommand.zeroup
                base[20] = CodeCommand.onedown
                base[21] = CodeCommand.oneup
                base[22] = CodeCommand.zerodown
                base[23] = CodeCommand.zeroup
                base[24] = CodeCommand.zerodown
                base[25] = CodeCommand.zeroup
            }
            19 -> {
                base[18] = CodeCommand.onedown
                base[19] = CodeCommand.oneup
                base[20] = CodeCommand.onedown
                base[21] = CodeCommand.oneup
                base[22] = CodeCommand.zerodown
                base[23] = CodeCommand.zeroup
                base[24] = CodeCommand.zerodown
                base[25] = CodeCommand.zeroup
            }
            20 -> {
                base[18] = CodeCommand.zerodown
                base[19] = CodeCommand.zeroup
                base[20] = CodeCommand.zerodown
                base[21] = CodeCommand.zeroup
                base[22] = CodeCommand.onedown
                base[23] = CodeCommand.oneup
                base[24] = CodeCommand.zerodown
                base[25] = CodeCommand.zeroup
            }
            21 -> {
                base[18] = CodeCommand.onedown
                base[19] = CodeCommand.oneup
                base[20] = CodeCommand.zerodown
                base[21] = CodeCommand.zeroup
                base[22] = CodeCommand.onedown
                base[23] = CodeCommand.oneup
                base[24] = CodeCommand.zerodown
                base[25] = CodeCommand.zeroup
            }
            22 -> {
                base[18] = CodeCommand.zerodown
                base[19] = CodeCommand.zeroup
                base[20] = CodeCommand.onedown
                base[21] = CodeCommand.oneup
                base[22] = CodeCommand.onedown
                base[23] = CodeCommand.oneup
                base[24] = CodeCommand.zerodown
                base[25] = CodeCommand.zeroup
            }
            23 -> {
                base[18] = CodeCommand.onedown
                base[19] = CodeCommand.oneup
                base[20] = CodeCommand.onedown
                base[21] = CodeCommand.oneup
                base[22] = CodeCommand.onedown
                base[23] = CodeCommand.oneup
                base[24] = CodeCommand.zerodown
                base[25] = CodeCommand.zeroup
            }
            24 -> {
                base[18] = CodeCommand.zerodown
                base[19] = CodeCommand.zeroup
                base[20] = CodeCommand.zerodown
                base[21] = CodeCommand.zeroup
                base[22] = CodeCommand.zerodown
                base[23] = CodeCommand.zeroup
                base[24] = CodeCommand.onedown
                base[25] = CodeCommand.oneup
            }
            25 -> {
                base[18] = CodeCommand.onedown
                base[19] = CodeCommand.oneup
                base[20] = CodeCommand.zerodown
                base[21] = CodeCommand.zeroup
                base[22] = CodeCommand.zerodown
                base[23] = CodeCommand.zeroup
                base[24] = CodeCommand.onedown
                base[25] = CodeCommand.oneup
            }
            26 -> {
                base[18] = CodeCommand.zerodown
                base[19] = CodeCommand.zeroup
                base[20] = CodeCommand.onedown
                base[21] = CodeCommand.oneup
                base[22] = CodeCommand.zerodown
                base[23] = CodeCommand.zeroup
                base[24] = CodeCommand.onedown
                base[25] = CodeCommand.oneup
            }
            27 -> {
                base[18] = CodeCommand.onedown
                base[19] = CodeCommand.oneup
                base[20] = CodeCommand.onedown
                base[21] = CodeCommand.oneup
                base[22] = CodeCommand.zerodown
                base[23] = CodeCommand.zeroup
                base[24] = CodeCommand.onedown
                base[25] = CodeCommand.oneup
            }
            28 -> {
                base[18] = CodeCommand.zerodown
                base[19] = CodeCommand.zeroup
                base[20] = CodeCommand.zerodown
                base[21] = CodeCommand.zeroup
                base[22] = CodeCommand.onedown
                base[23] = CodeCommand.oneup
                base[24] = CodeCommand.onedown
                base[25] = CodeCommand.oneup
            }
            29 -> {
                base[18] = CodeCommand.onedown
                base[19] = CodeCommand.oneup
                base[20] = CodeCommand.zerodown
                base[21] = CodeCommand.zeroup
                base[22] = CodeCommand.onedown
                base[23] = CodeCommand.oneup
                base[24] = CodeCommand.onedown
                base[25] = CodeCommand.oneup
            }
            30 -> {
                base[18] = CodeCommand.zerodown
                base[19] = CodeCommand.zeroup
                base[20] = CodeCommand.onedown
                base[21] = CodeCommand.oneup
                base[22] = CodeCommand.onedown
                base[23] = CodeCommand.oneup
                base[24] = CodeCommand.onedown
                base[25] = CodeCommand.oneup
            }
            else -> {
            }
        }//默认十六

        //第四步  模式  2-7
        when (mMode) {
            0 -> {
                base[2] = CodeCommand.zerodown
                base[3] = CodeCommand.zeroup
                base[4] = CodeCommand.zerodown
                base[5] = CodeCommand.zeroup
                base[6] = CodeCommand.zerodown
                base[7] = CodeCommand.zeroup
            }
            1 -> {
                base[2] = CodeCommand.onedown
                base[3] = CodeCommand.oneup
                base[4] = CodeCommand.zerodown
                base[5] = CodeCommand.zeroup
                base[6] = CodeCommand.zerodown
                base[7] = CodeCommand.zeroup
            }
            2 -> {
                base[2] = CodeCommand.zerodown
                base[3] = CodeCommand.zeroup
                base[4] = CodeCommand.onedown
                base[5] = CodeCommand.oneup
                base[6] = CodeCommand.zerodown
                base[7] = CodeCommand.zeroup
            }
            3 -> {
                base[2] = CodeCommand.onedown
                base[3] = CodeCommand.oneup
                base[4] = CodeCommand.onedown
                base[5] = CodeCommand.oneup
                base[6] = CodeCommand.zerodown
                base[7] = CodeCommand.zeroup
            }
            4 -> {
                base[2] = CodeCommand.zerodown
                base[3] = CodeCommand.zeroup
                base[4] = CodeCommand.zerodown
                base[5] = CodeCommand.zeroup
                base[6] = CodeCommand.onedown
                base[7] = CodeCommand.oneup
            }
        }
        //第五步 节电、换气 48-51
        if (menergy == 1) {
            Log.e("gaoyu", "开启节电换气")
            base[48] = CodeCommand.onedown
            base[49] = CodeCommand.oneup
            base[50] = CodeCommand.onedown
            base[51] = CodeCommand.oneup
        } else {
            base[48] = CodeCommand.zerodown
            base[49] = CodeCommand.zeroup
            base[50] = CodeCommand.zerodown
            base[51] = CodeCommand.zeroup
        }
        //第六步  风向  1、上下 36 数组 74.75
        when (mWindDir) {
            0 -> {
            }
            1 -> {
                base[74] = CodeCommand.onedown
                base[75] = CodeCommand.oneup
            }
            2 -> {
                base[80] = CodeCommand.onedown
                base[81] = CodeCommand.oneup
            }
        }//默认

        //最后一步 调取红外进行发送
        var content: String? = null
        for (i in base.indices) {
            content += String.valueOf(base[i]) + ","
        }
        Log.e("gaoyu", "数组信息是" + content!!)
        //发送完数据将大数组还原
        sendIrMsg(38000, base)
        base = CodeCommand.base

    }


    /**
     * 发射红外信号
     * 可以查看这个标签的log   ConsumerIr
     * @param carrierFrequency 红外传输的频率，一般的遥控板都是38KHz
     * @param pattern          指以微秒为单位的红外开和关的交替时间
     */
    private fun sendIrMsg(carrierFrequency: Int, pattern: IntArray) {
        IR!!.transmit(carrierFrequency, pattern)

        showToast("发送成功")
        var content: String? = null
        for (i in pattern.indices) {
            content += String.valueOf(pattern[i]) + ","
        }
        Log.e("gaoyu", "数组信息是" + content!!)
        Log.e("gaoyu", "一共有" + pattern.size)
    }

}