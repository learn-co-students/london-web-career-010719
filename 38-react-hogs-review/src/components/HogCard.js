import React from 'react'
import { Card, Icon, Checkbox } from 'semantic-ui-react';

const hogNameToImagePath = (name) => {
    return `./hog-imgs/${name.toLowerCase().split(" ").join("_")}.jpg`
}

const frontExtra = (props, onClick) => (<div>
    <div>
        <Icon name='winner' />
        {props["highest medal achieved"]}
    </div>
    <button onClick={onClick} >Show more details</button>
</div>)


const backExtra = (props, onClick, onCheckboxChange) => (<div>
    <div>
        <Icon name='winner' />
        {props["highest medal achieved"]}
    </div>
    <div>
        <Icon name='weight' />
        {props["weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water"]}
    </div>
    <label>Greased</label>
    <input type="checkbox" checked={props.greased} onChange={onCheckboxChange} />
    <button onClick={onClick} >Hide details</button>
    <button onClick={props.hideHog} >Hide this hog</button>
</div>)

class HogCard extends React.Component {

    state = {
        front: true
    }

    render = () => {
        const { name, specialty } = this.props
        return (

            <Card
                image={hogNameToImagePath(name)}
                header={name}
                meta={specialty}
                extra={
                    this.state.front ? frontExtra(this.props, () => this.setState({ front: false })) : backExtra(this.props, () => this.setState({ front: true }), this.props.toggleGreased)
                }
            />
        )
    }
}

export default HogCard
