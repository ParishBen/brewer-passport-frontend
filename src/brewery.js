class Brewery{
    constructor(city = null, state = null, address1 = null, country = null, phone = null, name_breweries, descript = null, website = null ){
        this.city = city
        this.state = state
        this.address = address1
        this.name = name_breweries
        this.country = country
        this.phoneNum = phone
        this.description = descript
        this.website = website

    }
}
let breweries = [];

// class Star{
//     constructor(x, y){
//       this.x = x
//       this.y = y
//       this.numParticles = Math.floor(random(3, 7))
//       this.particles = []
//       this.color = Math.floor(random(0, 3))
//       }
  
//       createParticles(){
//         for(let i = 0; i < this.numParticles; i++){
//           let newParticle = new Particle(this.x, this.y, random(5,10), random(0, 2 * PI), this.color)
//           this.particles.push(newParticle)
//       }
//     }
  
//     checkParticles(){
//       this.particles.forEach(particle => {
//         if(particle.alpha < 0){
//           this.particles.splice(this.particles.indexOf(particle), 1)
//         }
//       })
//     }
//   }


//   NEXT EX:
//   class Ball{
//     constructor(x, y, radius, speed, direction, note = null, waveType = null, delayTime = null, releaseTime = null){
//       this.x = x
//       this.y = y
//       this.radius = radius
//       this.speed = speed
//       this.direction = direction
//       if (note === null) {
//         this.note = notes[noteSel.value()]
//         this.waveType = waveSel.value()
//         this.delayTime = delaySlider.value()
//         this.releaseTime = releaseSlider.value()
//     } else {
//         this.note = note
//         this.waveType = waveType
//         this.delayTime = delayTime
//         this.releaseTime = releaseTime
//       }
//       this.sound = createSound(this.note, this.waveType, this.delayTime, this.releaseTime)
//     }
//     show(){
//       noStroke()
//       fill(255)
//       ellipse(this.x, this.y, this.radius)
//     }
  
//     update(){
//       if (this.direction === 0){
//         this.x += this.speed
//       } else if (this.direction === 1){
//         this.y += this.speed
//       }
//     }
//   }