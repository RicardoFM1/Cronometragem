import { Button, Form, InputGroup } from "react-bootstrap";
import { CiSearch } from "react-icons/ci";
import style from "./mesas.module.css";
import { useEffect, useState } from "react";
import Api from "../../service/api";
import Tabela from "../Tabela/tabela";
import { IoIosArrowForward } from "react-icons/io";
import MesaModal from "../Modais/Mesas/mesaModal";
import { toast } from "react-toastify";

const Mesas = () => {
  const [mesas, setMesas] = useState([]);
  const [mesasFiltradas, setMesasFiltradas] = useState([]);
  const [mesaSelecionada, setMesaSelecionada] = useState([]);
  const [show, setShow] = useState(false);
  const [search, setSearch] = useState("");

  const buscarMesas = async () => {
    try {
      const res = await Api.get("/mesa");

      if (res.status === 200) {
        setMesas(res.data.dados);
        setMesasFiltradas(res.data.dados);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    buscarMesas();
  }, []);

  const columns = [
    { header: "Número", accessor: "id_mesa" },
    { header: "Capacidade", accessor: "capacidade" },
    { header: "Restrição", accessor: "restricao" },
    { header: "", accessor: "", render: (row) => <IoIosArrowForward /> },
  ];

  const handleNovo = () => {
    setShow(true);

    setMesaSelecionada(null);
  };

  const handleSelected = (row) => {
    setShow(true);
    setMesaSelecionada(row);
  };

  const handleClose = () => {
    setShow(false);
    setMesaSelecionada(null);
    buscarMesas();
  };

  const enviarDados = async (dados) => {
    try {
      let res;

      if (mesaSelecionada) {
        res = await Api.put(`/mesa?id_mesa=${mesaSelecionada.id_mesa}`, dados);

        if (res.status === 200) {
          toast.success(res.data.mensagem || "Sucesso ao atualizar mesa");
          handleClose();
        }
      } else {
        res = await Api.post("/mesa", dados);

        if (res.status === 201) {
          toast.success(res.data.mensagem || "Sucesso ao registrar nova mesa");
          handleClose();
        }
      }
    } catch (err) {
      const erros = err.response.data?.erros;

      if (erros) {
        Object.values(erros).forEach((msg) => toast.error(msg));
      } else {
        toast.error(err.response.data?.mensagem);
      }
    }
  };

  const handleFiltragem = () => {
  

    setMesasFiltradas(
      mesas.filter((m) => String((m.id_mesa)).includes(search))
    );
  };

  useEffect(() => {
    handleFiltragem();
  }, [search, mesas]);
  return (
    <div>
      <div className="d-flex align-items-center justify-content-between">
        <div className="mx-5 my-5">
          <h1>Listagem de mesas</h1>
          <h5>Clique em uma mesa para editar informações</h5>
        </div>
        <div className="me-5">
          <Form.Group>
            <InputGroup>
              <InputGroup.Text>
                <CiSearch />
              </InputGroup.Text>
              <Form.Control
                type="number"
                placeholder="Busque uma mesa (nº)"
                onChange={(e) => setSearch(e.target.value)}
              />
            </InputGroup>
          </Form.Group>
        </div>
      </div>

      <Button className={style.btnAdicionar} onClick={handleNovo}>
        Adicionar novo registro
      </Button>
      <Tabela
        rows={mesasFiltradas}
        columns={columns}
        keyField={"id_mesa"}
        handleSelected={handleSelected}
      />
      <MesaModal
        dados={mesaSelecionada}
        handleClose={handleClose}
        show={show}
        submit={enviarDados}
      />
    </div>
  );
};

export default Mesas;
