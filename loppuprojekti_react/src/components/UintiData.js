import React, {Component} from 'react';
import KestavyysTietoLista from "./UintiTietoLista";
import ErrorPageIfNotLoggedIn from "./ErrorPageIfNotLoggedIn";


class UintiData extends Component {

    state = {data: []}

    componentDidMount() {
        this.haeUinnitJaPaivita();
    }

    //Haetaan painodata tietokannasta @Heidi

    haeUinnitJaPaivita() {
        fetch('/laji/uinti')
            .then(function (response) {
                if (response.status === 200 || response.status === 304)
                    return response.json();
                else
                    throw new Error(response.statusText);
            }.bind(this))
            .catch(function (error) {
                // virheilmoitus, uusi sivu tai dialogi tähän (vinkki Tommilta)
                console.log(error.message)
            })
            .then(function (json) {
                console.dir(json);
                this.setState({data: json})

            }.bind(this));
    }

    //Otetaan talteen käyttäjän syöttämä uintidata @Heidi

    tiedotSyötetty = (tiedot) => {
        let uinti = {uituMatka: matkan.tiedot.tahan, uinninKesto: keston.tiedot.tahan,
            pvm: tiedot.paivamaarasta.tahan, kayttajaId: auth.currentUser.uid};
        fetch('/laji/uinti', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(uinti)
        })
            .then(function (response) {
                if (response.status < 300)
                    this.haeUinnitJaPaivita();
                else
                    throw new Error(response.statusText);

            }.bind(this))
            .catch(function (error) {
                // virheilmoitus, uusi sivu tai dialogi tähän (vinkki Tommilta)
                console.log(error.message)
            });
    }

    //Uintitiedon poistaminen poista-nappulasta @Heidi

    poistaUinti = (poistettavanId) => {
        fetch('/laji/uinti' + poistettavanId,
            {method: 'DELETE'})
            .then(function (response) {
                if (response.status < 300) //Onko 300 poistossakin oikea statuskoodi, kun kaikki on ok??
                    this.haePainotJaPaivita();
                else
                    throw new Error(response.statusText);
            }.bind(this))
            .catch(function (error) {
                // virheilmoitus, uusi sivu tai dialogi tähän (vinkki Tommilta)
                console.log(error.message)
            });
    }

    render() {
        const user = auth.currentUser;

        if (user === null) {
            return (
                <ErrorPageIfNotLoggedIn/>
            )
        } else {
            return (
                <div>
                    <div>
                        <NaviWhenLoggedIn {...this.props}/>
                    </div>
                    <UintiForm uintiTiedotSyotetty={this.tiedotSyotetty}/>
                    <UintiTietoLista uintiTiedot={this.state.data} poista={this.poistaUinti}/>
                    <Profiledata uintiData={this.state.data}/>
                </div>
            );
        }
    }

}

export default UintiData;