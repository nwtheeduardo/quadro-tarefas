import axios from "axios";
import { createContext, ReactNode, useEffect, useState } from "react";

interface InterfaceEditarTarefa {
    editar: boolean;
    tarefa: InterfaceTarefas | null;
}


interface interfaceTarefaContext {
    tarefas: Array<InterfaceTarefas>;
    criarTarefas: (data: PropsTarefasInput) => Promise<void>;
    funEditarTarefa: (data: InterfaceEditarTarefa) => void;
    editarTarefa: InterfaceEditarTarefa;
    valoresPadraoEditarTarefa: () => void;
    atualizarTarefa: (data: InterfaceTarefas) => Promise<void>;
    deleteTarefas: (data: InterfaceTarefas)=> void;
  
  
}
export const TarefaContext = createContext({} as interfaceTarefaContext);

type InterfaceTarefas = {
    id: string,
    titulo: string,
    descricao: string,
    position: string,
}

type PropsTarefasInput = Omit<InterfaceTarefas, 'id'>
// type PropsTarefasInput2 = Pick<InterfaceTarefas, 'titulo'| 'descricao'>

// interface PropsTarefasInput { 
//     titulo: string,
//     descricao: string 
// }

interface PropsTarefasProvider {
    children: ReactNode;
}

export function TarefasProvider(props: PropsTarefasProvider) {

    const [tarefas, setTarefas] = useState<Array<InterfaceTarefas>>([]);
    const [editarTarefa, setEditarTarefa] = useState<InterfaceEditarTarefa>({
        editar: false, tarefa: null
    });
  

    // useEffect(() => {

    //     axios.get('/api/tarefas').then((res) => {
    //         setTarefas(res.data)
    //         console.log(res.data);
            
    //     })

    // }, [])

//#################### CREATE ##########################################################    

    async function criarTarefas(data: PropsTarefasInput) {
        await axios.post('/api/tarefas', data)
            .then((res) => {

            })

        await axios.get('/api/tarefas').then((resposta) => {

            setTarefas(resposta.data)

        })
    }
//#######################################################################################


 //############### EDIT #################################################################   

    async function atualizarTarefa(data: InterfaceTarefas) {
        await axios.put('/api/tarefas', data)
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })

        await axios.get('/api/tarefas').then((resposta) => {

            setTarefas(resposta.data)

        })
    }

    

    function funEditarTarefa(data: InterfaceEditarTarefa) {
        // console.log('funEditarTarefa')
        // console.log(data)
        setEditarTarefa(data)
        console.log(data);
        
    }


    function valoresPadraoEditarTarefa() {
        setEditarTarefa({ editar: false, tarefa: null })
    }


//##########################################################################################




   

//################## DELETE ################################################################



    async function deleteTarefas(data: InterfaceTarefas) {
        // // await axios.delete(`/api/tarefas/${data.id}`,{method: 'DELETE'})
        // .then((res) => {
        //     console.log("deleteTrefas")
        // })
        // .catch((err) => {
        //     console.log(err)
        // })
           await axios.delete(`/api/tarefas`,{method: 'DELETE',data: data})
        .then((res) => {
            console.log("deleteTrefas")
        })
        .catch((err) => {
            console.log(err)
        })



        await axios.get('/api/tarefas').then((resposta) => {

            setTarefas(resposta.data)
            

        })

            
        }
//##########################################################################################        

    return (
        <TarefaContext.Provider value={{
            tarefas, criarTarefas,
            atualizarTarefa,
            funEditarTarefa, editarTarefa, valoresPadraoEditarTarefa,
            deleteTarefas
           
        }}>
            {props.children}
        </TarefaContext.Provider>
    )
}
