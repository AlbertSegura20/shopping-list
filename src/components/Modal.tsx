'use client'
import React, { useState } from 'react';
import {Modal, Button, Text, Input, Row, Checkbox, Textarea} from "@nextui-org/react";
export default function CardModal({visible, closeHandler} : {visible:any, closeHandler:any}) {


    return (
        <div>

            <Modal
                preventClose
                blur
                closeButton
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}
            >
                <Modal.Header>

                    <Text id="modal-title" size={18}>
                        Add new card to <Text b size={18}>
                        Shopping List
                    </Text>

                    </Text>
                </Modal.Header>
                <Modal.Body>
                    <Input
                        clearable
                        bordered
                        fullWidth
                        color="primary"
                        size="lg"
                        placeholder="Card Title"
                    />

                    <Textarea bordered color={"success"} placeholder={"Card Text"} />

                </Modal.Body>
                <Modal.Footer>
                    <Button auto flat color="error" onPress={closeHandler}>
                        Close
                    </Button>
                    <Button auto onPress={closeHandler}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}