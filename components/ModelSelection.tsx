"use client";
import useSWR from "swr"
import Select, { StylesConfig } from 'react-select';

const fetchModels =()=>fetch('/api/auth/getEngines').then(res=>res.json())

const ModelSelection = () => {
    const {data:modles, isLoading}= useSWR('models',fetchModels)
    const {data:model, mutate:setModle} =useSWR('model',{
        fallbackData:"text-davinci-003"
    })

      const customStyles: StylesConfig<any>  = {
        control: (styles) => ({
            ...styles,
          backgroundColor: '#fff',
        }),
        menu: (styles) => ({
            ...styles,
          backgroundColor: '#434654',
        }),
      };

  return (
    <div >
        <Select className="mt-3" 
                isSearchable 
                isLoading={isLoading} 
                options={modles?.modelOptions}
                menuPosition="fixed"
                defaultValue={model}
                placeholder={model}
                styles={customStyles}
                onChange={(e)=>setModle(e.value)}
        />
    </div>
  )
}

export default ModelSelection