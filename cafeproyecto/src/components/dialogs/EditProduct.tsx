import React, { ReactNode, useState } from 'react';

import { Button } from '@radix-ui/themes';
import { Cross2Icon, Pencil2Icon, PlusIcon } from '@radix-ui/react-icons';
import * as Dialog from '@radix-ui/react-dialog';
import '../../styles/dialog/dialog-theme.css';

import { Product } from '../../interfaces/ProductsInterface';
import useEditProduct from '../../hooks/useEditProduct';



interface EditProduct {
  producto?: Product;
  triggerRef: any;
  edit?: boolean;
  btnTitle: string;
  onProductUpdated: () => void;
}

const EditProductDialog: React.FC<EditProduct> = ({ 
  producto, triggerRef, onProductUpdated, edit, btnTitle  
}) => {


  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [error, setError] = useState('');

  const [refresh, setRefresh] = useState(false);
  const { editProduct, createProduct } = useEditProduct();
  
  const handleNameChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target?.value);
  };
  
  const handleDescChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setDesc(event.target.value);
  };
  
  const handlePriceChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target?.value);
  };
  
  const handleImageUrlChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };
  
  const handleSubmit = async (event:React.FormEvent) => {

    event.preventDefault();
    try {
      if(producto) {
        const body = {
          productoId: producto.productoId,
          nombre: name !== undefined && name !== '' ? name : producto.nombre,
          descripcion: desc !== undefined && desc !== '' ? desc : producto.descripcion,
          precio: price !== undefined && price !== '' ? parseFloat(price) :  producto.precio,
          disponible: true,
          fechaCreacion: producto?.fechaCreacion,
          imagenUrl: imageUrl !== undefined && imageUrl !== '' ? imageUrl : producto.imagenUrl,
        };
        const updatedProduct = await editProduct(body);
        onProductUpdated();
        setIsOpen(false);
        console.log(updatedProduct);
      } else {
        const body = {
          productoId: 0,
          nombre: name,
          descripcion: desc,
          precio: parseFloat(price),
          disponible: true,
          fechaCreacion: '2024-05-21T12:56:41.410Z',
          imagenUrl: imageUrl,
        };

        const createdProduct = await createProduct(body);
        onProductUpdated();
        setIsOpen(false);
        console.log(createdProduct);
      }
    } catch (err) {
      console.log(err);
      setError(JSON.stringify(err));
    }
  };


  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
      <Button ref={triggerRef} className={`Button violet ${btnTitle !== 'edit' ? 'btn' : ''}`}>
        { (btnTitle==='edit') ? <Pencil2Icon /> : <PlusIcon/> }
        { (btnTitle==='edit') ? null : 'Agregar producto' }
      </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">

          <Dialog.Title className="DialogTitle">
            { (btnTitle==='edit') ? 'Editar Producto' : 'Crear producto' }
          </Dialog.Title>
          <Dialog.Description className="DialogDescription">
            
            { (btnTitle==='edit') 
            ? 'Modifica los detalles del producto. Haz clic en guardar cuando hayas terminado.' 
            : 'Ingresa los detalles del producto a crear. Haz clic en crear cuando hayas terminado.' }
          </Dialog.Description>

          <fieldset className="Fieldset">
            <label className="Label" htmlFor="nombre">Nombre</label>
            <input autoComplete='off' className="Input" id="nombre" defaultValue={producto?.nombre} onChange={handleNameChange}/>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="descripcion">Descripción</label>
            <input autoComplete='off' className="Input" id="descripcion" defaultValue={producto?.descripcion} onChange={handleDescChange}/>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="precio">Precio</label>
            <input autoComplete='off' className="Input" id="precio" defaultValue={producto?.precio} onChange={handlePriceChange}/>
          </fieldset>
          <fieldset className="Fieldset">
            <label className="Label" htmlFor="nombre">Imagen(URL)</label>
            <input autoComplete='off' className="Input" id="nombre" defaultValue={producto?.imagenUrl} onChange={handleImageUrlChange}/>
          </fieldset>
          <div style={{ display: 'flex', marginTop: 25, justifyContent: 'flex-end' }}>
            <Dialog.Close asChild>
              <button className="Button green" onClick={handleSubmit}>
                { (btnTitle==='edit') ? 'Guardar cambios' : 'Crear producto' }
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Cerrar">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default EditProductDialog;