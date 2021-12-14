import React from 'react';
import { Button, Header, Image, Modal } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import {Profile} from "skillset";

type Props = {
    profile: Profile,
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void;
};

export const ProfileModal: React.FC<Props> = ({profile, isVisible, setIsVisible}: Props) => {

    return (
        <Modal
            onClose={() => setIsVisible(false)}
            onOpen={() => setIsVisible(true)}
            open={isVisible}
        >
            <Modal.Header>{profile.name}</Modal.Header>
            <Modal.Content image>
                <Image size='medium' src={profile.imageUrl} wrapped />
                <Modal.Description>
                    <Header>About me</Header>
                    <span>{`${profile.role} - ${profile.location}`}</span>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color='black' onClick={() => setIsVisible(false)}>
                    Close
                </Button>
            </Modal.Actions>
        </Modal>
    );
};