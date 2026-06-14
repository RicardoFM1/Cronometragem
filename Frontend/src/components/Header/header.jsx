import { Button, Dropdown, Navbar } from "react-bootstrap";
import logoCasamento from "../../assets/logoCasamento.png"
import style from "./header.module.css"
import { useNavigate } from "react-router";
import { IoMdMenu } from "react-icons/io";


const Header = ({telaAtiva, setTelaAtiva}) => {
    const navigate = useNavigate()
    const handleSair = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <Navbar className="d-flex justify-content-between">
            <Navbar.Brand>
                <div className="ms-4 d-flex flex-row gap-4 align-items-center">
                    <img src={logoCasamento} alt="Logo casamento" className={style.logo} />
                    <h3 className="my-0 ">Senac Wedding</h3>
                </div>
            </Navbar.Brand>

            <div className={style.divMeio}>
            <Button onClick={() => setTelaAtiva('dashboard')} className={telaAtiva === 'dashboard' ? style.botaoAtivo : ""}>Dashboard</Button>
            <Button onClick={() => setTelaAtiva('convidados')} className={telaAtiva === 'convidados' ? style.botaoAtivo : ""}>Convidados</Button>
            <Button onClick={() => setTelaAtiva('checkin')} className={telaAtiva === 'checkin' ? style.botaoAtivo : ""}>Check-in</Button>
            <Button onClick={() => setTelaAtiva('mesas')} className={telaAtiva === 'mesas' ? style.botaoAtivo : ""}>Mesas</Button>

            </div>

            <div>
            <Button onClick={handleSair} className={style.botaoSair}>Sair</Button>

            </div>
            <Dropdown className="d-block d-xl-none" drop="start">
                <Dropdown.Toggle className=" bg-transparent border text-black me-3">
                    <IoMdMenu size={25}/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => setTelaAtiva('dashboard')}>Dashboard</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTelaAtiva('convidados')}>Convidados</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTelaAtiva('checkin')}>Check-in</Dropdown.Item>
                    <Dropdown.Item onClick={() => setTelaAtiva('mesas')}>Mesas</Dropdown.Item>
                    <Dropdown.Item onClick={handleSair} className="text-danger">Sair</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </Navbar>
    )
}

export default Header;