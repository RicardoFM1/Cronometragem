import { useState } from "react";
import Header from "../../components/Header/header";
import Dashboard from "../../components/Dashboard/dashboard";
import Checkins from "../../components/Checkins/checkins";
import Mesas from "../../components/Mesas/mesas";
import Convidados from "../../components/Convidados/convidados";

const Home = () => {
    const [telaAtiva, setTelaAtiva] = useState('dashboard')
    return (
        <>
        <Header telaAtiva={telaAtiva} setTelaAtiva={setTelaAtiva}/>

        <main>
            {telaAtiva === 'dashboard' && <Dashboard/>}
            {telaAtiva === 'checkins' && <Checkins/>}
            {telaAtiva === 'mesas' && <Mesas/>}
            {telaAtiva === 'convidados' && <Convidados/>}
        </main>
        </>
    )
}

export default Home;