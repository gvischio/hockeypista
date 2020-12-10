import React, { Component, useEffect } from 'react'

import { getSocieta } from '../Cache/CacheSocieta'

import Navbar from '../Components/Varie/Navbar';
import Loader from '../Components/Varie/Loader';
import ClassificaSocieta from '../Components/Classifica/ClassificaSocieta';
import { CaricaPartiteRecentiSocieta, CaricaPartiteInCorsoSocieta, CaricaPartiteFutureSocieta } from '../API/ApiInCorso';
import Partita from '../Components/Calendario/Partita';

export default class Societa extends Component {
    constructor(props) {
        super();

        this.id_soc = props.match.params.id;
        this.path = props.location.pathname;

        this.cached_soc = getSocieta(this.id_soc);
        console.log(this.cached_soc);

        this.state = {
            recenti: [],
            recenti_load: false,
            future: [],
            future_load: false,
            incorso: [],
            incorso_load: false
        };
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        
        CaricaPartiteRecentiSocieta(this.id_soc, (partite) => {
            this.state.recenti = partite;
            this.setState({ recenti_load: true });
        });
        CaricaPartiteInCorsoSocieta(this.id_soc, (partite) => {
            this.state.incorso = partite;
            this.setState({ incorso_load: true });
        });
        CaricaPartiteFutureSocieta(this.id_soc, (partite) => {
            this.state.future = partite;
            this.setState({ future_load: true });
        });
    }

    render() {
        return (
            <>
                <Navbar title={this.cached_soc.nome} canBeSaved={true} path={this.path} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-12 col-lg-6">
                            <div className="row">
                                <div className="col col-12">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column flex-sm-row align-items-sm-center">
                                                <div className="p-2 text-center">
                                                    <img src={this.cached_soc.logo} style={{ height: "110px" }} alt={this.cached_soc.small} />
                                                </div>
                                                <div className="p-2 d-none d-sm-block text-left">
                                                    <h3><b>{this.cached_soc.nome}</b></h3>
                                                    <h5 className="m-0">Codice società: <b>{this.cached_soc.id}</b></h5>
                                                </div>
                                                <div className="d-block d-sm-none text-center">
                                                    <h3><b>{this.cached_soc.nome}</b></h3>
                                                    <h5 className="m-0">Codice società: <b>{this.cached_soc.id}</b></h5>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Card title="situazione nelle classifiche">
                                <ClassificaSocieta {...this.cached_soc} />
                            </Card>
                        </div>
                        <div className="col col-12 col-lg-6">
                            <Card title="partite in corso">
                                {
                                    (!this.state.incorso_load) ? <Loader /> :
                                        (this.state.incorso.length == 0) ? <p className="m-2 text-center"><i>Nessuna partita in corso</i></p> :
                                            this.state.incorso.map((e, i) => <Partita key={i} {...e} />)
                                }
                            </Card>
                            <Card title="partite recenti">
                                {
                                    (!this.state.recenti_load) ? <Loader /> :
                                        (this.state.recenti.length == 0) ? <p className="m-2 text-center"><i>Nessuna partita recente</i></p> :
                                            this.state.recenti.map((e, i) => <Partita key={i} {...e} />)
                                }
                            </Card>
                            <Card title="partite in programma">
                                {
                                    (!this.state.future_load) ? <Loader /> :
                                        (this.state.future.length == 0) ? <p className="m-2 text-center"><i>Nessuna partita in programa</i></p> :
                                            this.state.future.map((e, i) => {
                                                e.idp = undefined;
                                                return <Partita key={i} {...e} />
                                            })
                                }
                            </Card>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

function Card(props) {
    return (
        <div className="row">
            <div className="col col-12">
                <div className="card">
                    <div className="card-header">
                        <h5 className="card-title text-uppercase">{props.title}</h5>
                    </div>
                    <div className="card-body">
                        <div>
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
