export const petalAnimate = (id, img) => {
  const canvas = document.querySelector(id);
  // innerWidth: 视口宽度;
  canvas.width = window.innerWidth;
  // innerWidth: 视口高度
  canvas.height = window.innerHeight;
  // 使用2d绘图的上下文
  const ctx = canvas.getContext("2d");
  // 定义花瓣数量
  const TOTAL = 70;
  // 花瓣数组
  const petalArray = [];

  // 加载花瓣图片
  const petalImg = new Image();
  petalImg.src = img;
  // 待图片加载完毕，将100个花瓣类的实例放到花瓣数组petalArray中
  petalImg.addEventListener("load", () => {
    for (let i = 0; i < TOTAL; i++) {
      petalArray.push(new Petal());
    }
    render();
  });

  /**
   * 定义渲染的方法
   */
  function render() {
    // 清除页面内容
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    petalArray.forEach((petal) => petal.animate());
    // 该方法会高速浏览器在重绘之前调用指定的函数
    // 这样可以保证在浏览器的刷新频率下去更新动画；
    window.requestAnimationFrame(render);
  }

  // 监听浏览器窗口大小变化，重新设置canvas的宽高
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  let mouseX = 0;
  function touchHandler(e) {
    mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth;
  }
  window.addEventListener("mousemove", touchHandler);
  window.addEventListener("touchmove", touchHandler);

  /**
   * 定义花瓣类
   */
  class Petal {
    // 构造方法
    constructor() {
      // 位置随机生成
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height * 2 - canvas.height;
      // 花瓣宽高随机生成
      this.w = 25 + Math.random() * 15;
      this.h = 20 + Math.random() * 10;
      // 透明度
      this.opacity = this.w / 40;
      // 旋转角度
      this.flip = Math.random();
      // 速度初始化
      this.xSpeed = 1.5 + Math.random() * 2;
      this.ySpeed = 1 + Math.random() * 1;
      this.flipSpeed = Math.random() * 0.03;
    }

    // 绘图
    draw() {
      // 当花瓣超过边界，重新设置其位置、速度和旋转角度
      if (this.y > canvas.height || this.x > canvas.width) {
        this.x = -petalImg.width;
        this.y = Math.random() * canvas.height * 2 - canvas.height;
        this.xSpeed = 1.5 + Math.random() * 2;
        this.ySpeed = 1 + Math.random() * 1;
        this.flip = Math.random();
      }
      // 设置整个canvas透明度基数
      ctx.globalAlpha = this.opacity;
      ctx.drawImage(
        petalImg,
        this.x,
        this.y,
        this.w * (0.6 + Math.abs(Math.cos(this.flip)) / 3),
        this.h * (0.8 + Math.abs(Math.sin(this.flip)) / 5)
      );
    }

    animate() {
      this.x += this.xSpeed + mouseX * 5;
      this.y += this.ySpeed + mouseX * 2;
      this.flip += this.flipSpeed;
      this.draw();
    }
  }
};

export const snowAnimate = (id) => {
  const canvas = document.querySelector(id);
  // 获取 2d 上下文
  const snowCtx = canvas.getContext("2d");
  let width, height;
  // 获取window的宽高，赋值给画布
  canvas.width = width = window.innerWidth;
  canvas.height = height = window.innerHeight;

  // 常量、参数
  const TOTAL = 600, // 雪花数量
    tsc = 1, // 用来设置雪花飘落效果的参数
    speed = 1; // 雪花飘落速度
  const sc = 1.3, // 用来生成雪花半径的参数
    t = 0, // 用来设置雪花飘落效果的参数
    mv = 20,
    minSpeed = 1, // 雪花飘落的最小速度
    snowArr = []; // 雪花数组，用来存放雪花的实例

  /**
   * 下雪
   */
  function Snowy() {
    // 生成 TOTAL 数量的雪花类实例，存放到 snowArr 数组中
    for (let i = 0; i < TOTAL; i++) {
      const snowFlake = new SnowFlake();
      snowArr.push(snowFlake);
    }
    // 渲染雪花
    render();
  }

  /**
   * 渲染函数
   */
  function render() {
    // 清除画布内容，准备绘制
    snowCtx.clearRect(0, 0, width, height);
    // 遍历雪花数组，让雪花数组中的实例改变位置、速度 等参数
    snowArr.forEach((snowFlake) => snowFlake.animate());
    // 该方法会让浏览器在重绘之前调用指定的函数 render
    // 这样可以保证在浏览器的刷新频率下更新动画；
    window.requestAnimationFrame(render);
  }

  /**
   * 雪花 类
   */
  class SnowFlake {
    /**
     * 构造方法,数据初始化
     */
    constructor() {
      this.y = Math.random() * (height + 50); // y轴坐标
      this.x = Math.random() * width; // x轴坐标
      this.t = Math.random() * (Math.PI * 2);
      this.size = (100 / (10 + Math.random() * 100)) * sc; // 雪花半径
      this.speed = Math.pow(this.size * 0.7, 2) * 0.15 * speed; // 雪花尺寸越大，速度越快，为了营造一种远近的层次感
      this.speed = this.speed < minSpeed ? minSpeed : this.speed;
    }

    /**
     * 雪花绘制的方法
     */
    draw() {
      /*
            createRadialGradient：创建(圆形)梯度渐变
            圆形起始区域：this.x(x轴坐标) this.y(y轴坐标) 0(半径)
            圆形结束区域：this.x(x轴坐标) this.y(y轴坐标) this.size(半径)
        */
      this.g = snowCtx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.size
      );
      /*
            设置区域渐变色
            简单理解：从圆心到园外由白色渐渐变成白色透明效果
        */
      this.g.addColorStop(0, "rgba(255, 255, 255, 1)"); // 白色，透明度1
      this.g.addColorStop(1, "rgba(255, 255, 255, 0)"); // 白色，透明度0
      snowCtx.moveTo(this.x, this.y); // “画笔”移动到 (this.x, this.y) 位置，准备开始画
      snowCtx.fillStyle = this.g;
      snowCtx.beginPath(); // 开始
      // arc() 画圆（雪花）
      snowCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2, true);
      snowCtx.fill(); // 着色

      // y轴方向超出画布高度，重新设置雪花在y轴的坐标
      if (this.y > height + 50) {
        this.y = -10 - Math.random() * mv;
      }
      // x轴方向超出画布的宽度，重新设置雪花在x的坐标
      if (this.x > width + mv) {
        this.x = -mv;
      }
      if (this.x < -mv) {
        this.x = width + mv;
      }
    }

    /**
     * 重新设置雪花运动时的参数，包括位置、速度等
     */
    animate() {
      this.t += 0.05;
      this.t = this.t >= Math.PI * 2 ? 0 : this.t;
      this.y += this.speed; // y轴方向匀速下落
      this.x += Math.sin(this.t * tsc) * (this.size * 0.3); // 利用 Math.sin() 函数让雪花下落过程中水平方向产生正弦图形似的移动效果

      // 利用上述参数重新绘制雪花
      this.draw();
    }
  }

  // 监听浏览器窗口变化
  window.addEventListener("resize", () => {
    canvas.width = width = window.innerWidth;
    canvas.height = height = window.innerHeight;
  });

  // 调用 Snowy(), 开始下雪！
  Snowy();
};
