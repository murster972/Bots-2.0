#!/usr/bin/env python3
from threading import Thread
import os, sys
import socket
import hashlib

class BotMaster:
    def __init__(self, ip, port):
        self.server_ip = ip
        self.server_port = port

        self.server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.server_socket.setsockopt()
        self.server.bind((ip, port))

    def _find_bots():
        while True:
            #find client

            #create client thread

    ''' pulls commands from database '''
    def _get_commands(self):
        pass

    ''' sends command to client '''
    def _send_commands(self):
        pass

class BotHandler:
    def __init__(self, socket, addr):
        #generate and send client id

        #recv client info

        #create database entry for client and upload info

        #

        pass

def main():
    pass

if __name__ == '__main__':
    main()
