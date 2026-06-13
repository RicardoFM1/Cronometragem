import { useEffect, useState } from "react";
import imagemCasamento from "../../assets/imagemCasamento.png";
import logoCasamento from "../../assets/logoCasamento.png";
import style from "./login.module.css";
import { Button, Form, InputGroup, Stack } from "react-bootstrap";
import { MdAttachEmail } from "react-icons/md";
import { MdPassword } from "react-icons/md";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Api from "../../service/api";
import { useNavigate } from "react-router";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "", senha: ""
    })

    const [mostrarSenha, setMostrarSenha] = useState(false)

    const handleChange = (e) => {
        const {name, value} = e.target;

        if(!name) console.log('Sem nome no campo')
        
        setFormData((prev) => ({...prev, [name]: value}))

    }

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        try{
e.preventDefault();
            const res = await Api.post('/usuario/login', formData)

            if(res.status === 200){
                toast.success(res.data.mensagem)
                localStorage.clear
                localStorage.setItem('token', res.data?.token)
                navigate('/')
            }

        }catch(err){
            const erros = err.response?.data?.erros 

            if(erros){
                Object.values(erros).forEach((msg) => {
                    toast.error(msg)
                })
            }else{
                toast.error(err.response?.data?.mensagem)
            }
        }
    }

    useEffect(() => {
        if(localStorage.getItem('token')){
            navigate('/')
        }
    }, [])


  return (
    <div className={style.divLogin}>
      <div className={style.divFoto}>
        <img
          className={style.foto}
          src={imagemCasamento}
          alt="Imagem casamento"
        />
      </div>

      <div className={style.divForm}>
           
        <div className="text-center w-75">

          <img
            className={style.logo}
            src={logoCasamento}
            alt="Logo casamento"
            />
          <h1>Senac Wedding</h1>
          <h5>Seu portal de casamentos</h5>
          <hr className="w-100" />
            </div>
    <Form className="w-75" onSubmit={handleSubmit}>
    <Stack gap={4}>

            <Form.Group>
            <Form.Label className="fw-bold">Email</Form.Label>
            <InputGroup>
              <InputGroup.Text><MdAttachEmail/></InputGroup.Text>
              <Form.Control
              type="email"
              value={formData.email}
              placeholder="Seu melhor email"
              required
              name="email"
              onChange={handleChange}
              />

            </InputGroup>
          </Form.Group>
          <Form.Group>
            <Form.Label className="fw-bold">Senha</Form.Label>
            <InputGroup>
              <InputGroup.Text><MdPassword/></InputGroup.Text>
              <Form.Control 
              type={mostrarSenha ? 'text' : 'password'}
              value={formData.senha}
              placeholder="Seu senha mais segura"
              required
              name="senha"
              onChange={handleChange}
              />
              <Button className="bg-transparent border" onClick={() => setMostrarSenha(!mostrarSenha)}>{mostrarSenha ? <FaEye color="black"/> : <FaEyeSlash color="black"/>}</Button>
            </InputGroup>
          </Form.Group>
          <Button className={style.btnSubmit} type="submit">
            Login
          </Button>
    </Stack>
    </Form>
          
        
      </div>
    </div>
  );
};

export default Login;
