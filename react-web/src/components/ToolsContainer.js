import React, { Component } from 'react';
import sanity from '../lib/sanity'
import ToolCard from './ToolCard'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import SearchComponent from './SearchComponent';


const styles = {
    root: {
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

function TabContainer(props) {

    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}


export default class ToolsContainer extends Component {
    constructor() {
        super()
        this.state = {
            links: [],
            filteredLinks : []
        }
    }

    async componentDidMount() {
        const query = `*[_type == '${this.props.match.params.schema}']{type, _type, text, title, priority, url, _id}`
        const links = await sanity.fetch(query);
        this.setState({ links })
    }

    handleSearch =  event => {
            const searchedLinks = this.state.links.filter(item => {
                const normalizedSearch = event.target.value.replace(/[^A-Za-z0-9]+/gi, '')
                const regex = new RegExp(normalizedSearch, 'i');
                return item.title.match(regex) || false
            });
            this.setState({
                filteredLinks: searchedLinks
            })
        };

    render() {
        let linksToDisplay;
        this.state.filteredLinks.length < 1 ? linksToDisplay = this.state.links : linksToDisplay = this.state.filteredLinks;
        return (
            <TabContainer>
                <SearchComponent handleSearch={this.handleSearch} />
                <Grid container className={styles.root} spacing={16}>
                    <ToolCard links={linksToDisplay} />
                </Grid>
            </TabContainer>
        );

    }

}