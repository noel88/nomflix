import React, {Component} from 'react';
import DetailPresenter from "./DetailPresenter";
import {tvApi, moviesApi} from '../../api';

class DetailContainer extends Component {
    constructor(props) {
        super(props);
        const {location: {pathname}} = props;

        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }


    async componentDidMount() {
        const {
            match : {
                params: {id}
            },
            history: { push }
        } = this.props;

        const { isMovie } = this.state;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return push("/");
        }
        let result = null;
        try {
            if (isMovie) {
                ({data: result} = await moviesApi.movieDetail(parsedId));
            } else {
                ({data: result} = await tvApi.showDetail(parsedId));
            }
            this.setState({
                result
            })
        } catch {
            this.this.setState({error: "Can't find anything!"})
        } finally {
            this.setState({loading: false })
        }
    }

    render() {
        const {result, error, loading} = this.state;
        return (
            <DetailPresenter
                loading={loading}
                result={result}
                error={error}
            />
        );
    }
}

export default DetailContainer;