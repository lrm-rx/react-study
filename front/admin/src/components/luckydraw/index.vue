<template>
  <div class="luckydraw">
    <div class="luckydraw_top">
      <img src="@/assets/luckydraw/wt.png" alt="">
    </div>

    <div class="luckdraw_cont">
      <!-- <div class="dot" v-for="(item, index) in dots" :key="index" :class="{ isred: item.isred }"
        :style="`top:${item.top}vw;left:${item.left}vw`"></div> -->
      <div class="luckdraw_list">
        <div class="row">
          <div class="row_gift" :class="{ row_gift_isactive: item.active }" v-for="item in list.slice(0, 3)"
            :key="item.id">
            <img :src="item.img" alt="">
          </div>

        </div>
        <div class="row">
          <div class="row_gift" :class="{ row_gift_isactive: item.active }" v-for="item in list.slice(3, 5)"
            :key="item.id">
            <img :src="item.img" alt="">
          </div>
          <div @click="start" class="row_gift row_start">
            点击抽奖
          </div>
        </div>
        <div class="row">
          <div class="row_gift" :class="{ row_gift_isactive: item.active }" v-for="item in list.slice(5, 8)"
            :key="item.id">
            <img :src="item.img" alt="">
          </div>
        </div>

        <div class="luckdraw_mask" v-if="isMask"></div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import gift0 from '@/assets/luckydraw/1.png'
import gift1 from '@/assets/luckydraw/2.png'
import gift2 from '@/assets/luckydraw/3.png'
import gift3 from '@/assets/luckydraw/4.png'
import gift4 from '@/assets/luckydraw/5.png'
import gift5 from '@/assets/luckydraw/6.png'
import gift6 from '@/assets/luckydraw/7.png'
import gift7 from '@/assets/luckydraw/8.png'
import { ref, watchEffect, defineProps, defineEmits } from 'vue'
const props = defineProps(['id'])
const emits = defineEmits(['start', 'animationOver'])
interface awardList {
  id: number,
  name: string,
  active: boolean,
  img: string
}
//奖品列表
const list = ref<awardList[]>([
  {
    id: 0,
    name: '5',
    active: true,
    img: gift0
  }, {
    id: 1,
    name: '50',
    active: false,
    img: gift1
  }, {
    id: 2,
    name: '15',
    active: false,
    img: gift2
  }, {
    id: 3,
    name: '20',
    active: false,
    img: gift3
  }, {
    id: 4,
    name: '120',
    active: false,
    img: gift4
  }, {
    id: 5,
    name: 'thanks',
    active: false,
    img: gift5
  }, {
    id: 6,
    name: '25',
    active: false,
    img: gift6
  }, {
    id: 7,
    name: '10',
    active: false,
    img: gift7
  },
])
//抽奖闪烁顺序
const sequenceIds = [0, 1, 2, 4, 7, 6, 5, 3]


const isMask = ref(false); //是否开始抽奖

const start = () => {
  isMask.value = true
  emits('start')
}

/**
* 抽奖过程动画
* @param {number} index 
* @param {number} index 速度
* @param {number} id 中奖id 
* @return {void}
*/
let time = 1;
const luckyAnimation = (index = 0, speed = 1, id: number) => {
  let isfun = false
  time > 10 ? time += 10 : time += 0.1
  time > 50 && (isfun = true)
  setTimeout(() => {
    if (index == 0) {
      list.value[sequenceIds[sequenceIds.length - 1]].active = false
    } else {
      list.value[sequenceIds[index - 1]].active = false
    }

    list.value[sequenceIds[index]].active = true
    console.log(sequenceIds[index], id)
    if (isfun && sequenceIds[index] == id) {
      //动画结束,发送弹窗事件
      setTimeout(() => {
        emits('animationOver', id)
        isMask.value = false
        list.value[sequenceIds[index]].active = false
      }, 1000)


      time = 1
      isfun = false
      return
    }
    index++
    if (index > 7) index = 0
    luckyAnimation(index, time, id)
  }, 10 * speed)
}
//监听中奖id变化 调用抽奖函数
watchEffect(() => {
  if (sequenceIds.indexOf(props.id) != -1) {
    luckyAnimation(0, time, props.id)
  }
})

//边缘闪烁点

interface Dot {
  isred: boolean
  top: number
  left: number
}

const dots = ref<Dot[]>([
  {
    isred: true,
    top: 8,
    left: 2
  },
  {
    isred: false,
    top: 7,
    left: 15
  },
  {
    isred: true,
    top: 7,
    left: 30
  },
  {
    isred: false,
    top: 7,
    left: 45
  },
  {
    isred: true,
    top: 7,
    left: 60
  },
  {
    isred: false,
    top: 7,
    left: 75
  },

  {
    isred: true,
    top: 7,
    left: 89
  },
  {
    isred: false,
    top: 20,
    left: 90.6
  },
  {
    isred: true,
    top: 35,
    left: 90.6
  },
  {
    isred: false,
    top: 50,
    left: 90.6
  },
  {
    isred: true,
    top: 65,
    left: 90.6
  },
  {
    isred: false,
    top: 80,
    left: 90.6
  },
  {
    isred: true,
    top: 95,
    left: 90.6
  },
  {
    isred: false,
    top: 103,
    left: 90
  },
  {
    isred: true,
    top: 104.6,
    left: 75
  },
  {
    isred: false,
    top: 104.6,
    left: 60
  },
  {
    isred: true,
    top: 104.6,
    left: 45
  },
  {
    isred: false,
    top: 104.6,
    left: 30
  },
  {
    isred: true,
    top: 104.6,
    left: 15
  },
  {
    isred: false,
    top: 103.6,
    left: 2
  },
  {
    isred: true,
    top: 90,
    left: 0.5
  },
  {
    isred: false,
    top: 75,
    left: 0.5
  },
  {
    isred: true,
    top: 60,
    left: 0.5
  },
  {
    isred: false,
    top: 45,
    left: 0.5
  },
  {
    isred: true,
    top: 32,
    left: 0.5
  },
  {
    isred: false,
    top: 19,
    left: 0.5
  },
])

// setInterval(() => {
//   dots.value.forEach((item) => {
//     item.isred = !item.isred
//   })
// }, 500)
</script>

<style lang="scss" scoped>
.luckydraw {
  overflow: hidden;

  .luckydraw_top {
    display: flex;
    justify-content: center;

    img {
      width: 350px;
    }
  }

  .luckdraw_cont {
    background: url('../../assets/luckydraw/bg.png') no-repeat;
    background-size: 100% auto;
    width: 350px;
    margin: 0 auto;
    height: 348px;
    padding-top: 55px;
    position: relative;

    .luckdraw_overtime {
      color: #fff;
      font-size: 16px;
      text-align: center;

    }

    .luckdraw_list {
      width: 85%;
      margin: 0 auto;
      margin-top: 15px;
      position: relative;

      .row {
        display: flex;
        justify-content: space-between;
        position: relative;
        margin-bottom: 8px;

        .row_gift {
          width: 93px;
          height: 90px;
          background: url('../../assets/luckydraw/box-item.png') no-repeat;
          background-size: cover;

          img {
            width: 100%;
            overflow: hidden;
          }
        }

        .row_gift_isactive {
          position: relative;
          z-index: 10;
        }

        .row_start {
          position: absolute;
          left: calc(93px + (100% - 93*3px) / 2);
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
          line-height: 90px;
          font-weight: bolder;
          color: #525dd5;

          &:hover {
            cursor: pointer;
          }
        }
      }



      .luckdraw_mask {
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        background: #000;
        opacity: 0.5;
        border-radius: 10px;
        overflow: hidden;
      }
    }
  }
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #FEFE00;
  position: absolute;

}

.isred {
  background: #F97941;
}
</style>