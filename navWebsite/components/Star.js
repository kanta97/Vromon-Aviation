import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faSquare, faStar, faExclamationCircle, faCircleCheck } from '@fortawesome/free-solid-svg-icons'

export default class Star extends Component {

    render() {
        return (
            <div>
                {
                    this.props.quntity == 3 &&
                    <div>
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}

                    </div>
                }
                {
                    this.props.quntity == 4 &&
                    <div>
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}

                    </div>
                }
                {
                    this.props.quntity == 5 &&
                    <div>
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />{' '}
                        <FontAwesomeIcon
                            icon={
                                faStar
                            }
                            style={{
                                color: '#2e2d80'
                            }}
                        />

                    </div>
                }

            </div>
        )
    }
}
