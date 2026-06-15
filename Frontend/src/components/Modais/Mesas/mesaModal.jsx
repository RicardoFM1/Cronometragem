import { useEffect, useState } from "react";
import { Button, Form, Modal, Stack } from "react-bootstrap";
import style from "./mesaModal.module.css"
const MesaModal = ({ dados, show, submit, handleClose }) => {
  const [formData, setFormData] = useState({
    capacidade: "",
    restricao: "",
  });
  const [editando, setEditando] = useState(false);

  useEffect(() => {
    if (dados) {
      setEditando(true);
      setFormData(dados);
    } else {
      setEditando(false);
      setFormData({
        capacidade: "",
        restricao: "",
      });
    }
  }, [show, dados]);

  const handleSubmit = (e) => {
    e.preventDefault();

    submit(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!name) console.log("Sem nome no campo");

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {editando ? "Gerenciar mesa" : "Registrar nova mesa"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>

          <Form.Group>
            <Form.Label>Capacidade</Form.Label>
            <Form.Control
              value={formData.capacidade}
              name="capacidade"
              placeholder="Capacidade da mesa"
              onChange={handleChange}
              type="number"
              required={!editando}
              />
          </Form.Group>
          <Form.Group>
            <Form.Label>Restrição (retirar em breve)</Form.Label>
            <Form.Control
              value={formData.restricao}
              name="restricao"
              placeholder="Restrição da mesa"
              onChange={handleChange}
              required={!editando}
              
              />
          </Form.Group>
              </Stack>
              <Stack direction="horizontal" className="d-flex justify-content-end mt-5" gap={3}>

          <Button type="button" onClick={handleClose} className={style.btnCancelar} >Cancelar</Button>
          <Button type="submit" className={style.btnSubmit}>{editando ? 'Salvar alterações' : 'Registrar' }</Button>
              </Stack>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default MesaModal;
