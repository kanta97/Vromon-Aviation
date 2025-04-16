
import React, { Component } from 'react'
import Aux from '../hoc/Auxiliary'

class LayoutSecondary extends Component {
    render() {
        return (
            <Aux>

                {this.props.children}

            </Aux>
        )
    }
}

export default LayoutSecondary;