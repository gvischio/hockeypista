import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { getCachedCampionato } from '../Cache/CacheCampionato'

import Loader from '../Components/Varie/Loader'
import Navbar from '../Components/Varie/Navbar'
import MarcatoriBox from '../Components/Marcatori/MarcatoriBox'
import ClassificaBox from '../Components/Classifica/ClassificaBox'
import SquadraBox from '../Components/Campionati/SquadraBox'

export default class Campionato extends Component {

    constructor(props) {
        super();
        this.id_camp = props.match.params.id;

        // recupero il campionato di appartenenza dalla cache
        this.camp = getCachedCampionato(this.id_camp);

        // imposto lo stato della pagina
        this.state = {}
    }

    render() {
        return (
            <>
                <Navbar title={this.camp.name} />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col col-xl-8 col-lg-7 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5 className="card-title">SQUADRE</h5>
                                </div>
                                <div className="card-body" style={{ padding: "0.75rem" }}>
                                    <div className="row">
                                        {
                                            this.camp.teams.map((e, i) => <SquadraBox key={i} {...e} />)
                                        }
                                    </div>
                                </div>
                            </div>
                            <div id="playing-parent" className="card d-none">
                                <div className="card-header">
                                    <h5 className="card-title">PARTITE IN CORSO</h5>
                                </div>
                                <div className="card-body">
                                    <div className="row" id="playing">

                                    </div>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title">CALENDARIO</h5>
                                        <Link to={"/calendario/" + this.id_camp}>
                                            calendario completo
                                        </Link>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <h5 className="d-inline-block">Ultima giornata</h5>
                                    <div id="cal-last-day">
                                        <Loader />
                                    </div>
                                    <br />
                                    <h5>Prossima giornata</h5>
                                    <div id="cal-next-day">
                                        <Loader />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col col-xl-4 col-lg-5 col-md-12">
                            <ClassificaBox idc={this.id_camp} />
                            <MarcatoriBox idc={this.id_camp} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
