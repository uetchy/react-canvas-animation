import React, { Children } from 'react'
import ReactDOM from 'react-dom'

class Animator extends React.Component {
  constructor(props) {
    super()
  }

  animate(ctx) {}

  render() {
    console.log('render animator')
    const ctx = this.props.context
    if (!ctx) return null

    ctx.save()
    this.animate(ctx)
    ctx.restore()
  }
}

class Particle extends Animator {
  animate(ctx) {
    ctx.fillStyle = 'red'
    ctx.fillRect(10, 10, 40, 30)
  }
}

class Canvas extends React.Component {
  constructor(props) {
    super()
    this.canvas = React.createRef()
  }

  componentDidMount() {
    this.ctx = this.canvas.current.getContext('2d')
    this.cycle()
  }

  cycle() {
    this.forceUpdate()
    requestAnimationFrame(this.cycle.bind(this))
  }

  render() {
    const childrenWithProps = Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        context: this.ctx || null,
      })
    })
    return (
      <div>
        <canvas ref={this.canvas} />
        {childrenWithProps}
      </div>
    )
  }
}

ReactDOM.render(
  <Canvas>
    <Particle />
  </Canvas>,
  document.querySelector('#container')
)
