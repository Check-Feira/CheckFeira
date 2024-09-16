import { ChangeEvent, useState } from "react";

import api from "../../../Lib/Api";
import { newWishListItem } from "@/Types/WishlistItem.interface";

// bootstrap components
import { Button, Form, Modal, Stack } from "react-bootstrap";

interface newProductProps {
  updateWishlist: () => void;
  searchItem: string;
  setSearchItem: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function NewItem({ updateWishlist, searchItem, setSearchItem }: newProductProps) {

  const [newProduct, setNewProduct] = useState<newWishListItem>({ name: '', price: 0 });
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, name: e.target.value });
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, price: parseFloat(e.target.value) });
  };

  const handleCreateProduct = async () => {
    try {
      await api.postWishList(newProduct);
      setNewProduct({ name: "", price: 0 });
      handleCloseModal();
      updateWishlist();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <>
      <Stack direction="horizontal" className="mb-3">
        <input
          style={{width: "100%", maxWidth: "250px", marginRight: "5px"}}
          type="text"
          placeholder="buscar produto"
          className="form-control"
          value={searchItem}
          onChange={setSearchItem}
        />
        <Button variant="success" className="ms-auto" onClick={handleShowModal}>Adicionar</Button>
      </Stack>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Produto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="nome">
              <Form.Label>Nome do produto</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome"
                value={newProduct.name}
                onChange={handleNameChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="valor">
              <Form.Label>Valor do produto</Form.Label>
              <Form.Control
                type="number"
                placeholder="Digite o valor"
                value={newProduct.price}
                onChange={handlePriceChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleCreateProduct}>
            Adicionar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}