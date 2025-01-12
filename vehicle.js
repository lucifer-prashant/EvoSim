class Vehicle {
	constructor(x, y, dna) {
		this.position = createVector(x, y)
		this.velocity = createVector(0, -2)
		this.acceleration = createVector(0, 0)
		this.r = 4
		this.maxspeed = 5
		this.maxforce = 0.2
		this.health = 1
		this.age = 0

		this.dna = dna || [
			random(-2, 2), // food weight
			random(-2, 2), // poison weight
			random(10, 100), // food perception
			random(10, 100), // poison perception
		]
	}

	update(speedMultiplier) {
		this.health -= 0.005 * speedMultiplier
		this.age += 0.016 * speedMultiplier

		this.velocity.add(this.acceleration)
		this.velocity.limit(this.maxspeed)
		this.position.add(this.velocity)
		this.acceleration.mult(0)
	}

	applyForce(force) {
		this.acceleration.add(force)
	}

	behaviours(good, bad) {
		let steerG = this.eat(good, 0.2, this.dna[2])
		let steerB = this.eat(bad, -0.5, this.dna[3])

		steerG.mult(this.dna[0])
		steerB.mult(this.dna[1])

		this.applyForce(steerG)
		this.applyForce(steerB)
	}

	reproduce(mutationRate) {
		if (this.health > 1.5 && random(1) < 0.005) {
			this.health *= 0.8
			return new Vehicle(
				this.position.x,
				this.position.y,
				this.dna.map((gene, i) => {
					if (random(1) < mutationRate) {
						if (i < 2) return gene + random(-0.1, 0.1)
						return gene + random(-10, 10)
					}
					return gene
				})
			)
		}
		return null
	}

	eat(list, nutrition, perception) {
		let record = Infinity
		let closest = null

		for (let i = list.length - 1; i >= 0; i--) {
			let d = this.position.dist(list[i])

			if (d < this.maxspeed) {
				list.splice(i, 1)
				this.health += nutrition
				if (this.health > 2) this.health = 2
			} else if (d < perception && d < record) {
				record = d
				closest = list[i]
			}
		}

		if (closest != null) {
			return this.seek(closest)
		}

		return createVector(0, 0)
	}

	seek(target) {
		let desired = p5.Vector.sub(target, this.position)
		desired.setMag(this.maxspeed)

		let steer = p5.Vector.sub(desired, this.velocity)
		steer.limit(this.maxforce)

		return steer
	}

	boundaries() {
		let desired = null
		let margin = 25

		if (this.position.x < margin) {
			desired = createVector(this.maxspeed, this.velocity.y)
		} else if (this.position.x > width - margin) {
			desired = createVector(-this.maxspeed, this.velocity.y)
		}

		if (this.position.y < margin) {
			desired = createVector(this.velocity.x, this.maxspeed)
		} else if (this.position.y > height - margin) {
			desired = createVector(this.velocity.x, -this.maxspeed)
		}

		if (desired !== null) {
			desired.normalize()
			desired.mult(this.maxspeed)
			let steer = p5.Vector.sub(desired, this.velocity)
			steer.limit(this.maxforce)
			this.applyForce(steer)
		}
	}

	dead() {
		return this.health < 0
	}

	display(debug) {
		let angle = this.velocity.heading() + PI / 2

		let healthColor = lerpColor(
			color(255, 0, 0),
			color(0, 255, 0),
			this.health / 2
		)

		push()
		translate(this.position.x, this.position.y)
		rotate(angle)

		fill(healthColor)
		stroke(200)
		strokeWeight(1)
		beginShape()
		vertex(0, -this.r * 2)
		vertex(-this.r, this.r * 2)
		vertex(this.r, this.r * 2)
		endShape(CLOSE)

		if (debug) {
			noFill()
			stroke(0, 255, 0, 100)
			ellipse(0, 0, this.dna[2] * 2)
			line(0, 0, 0, -this.dna[0] * 20)

			stroke(255, 0, 0, 100)
			ellipse(0, 0, this.dna[3] * 2)
			line(0, 0, 0, -this.dna[1] * 20)
		}

		pop()
	}
}
