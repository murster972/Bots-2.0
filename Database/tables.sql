/* creates tables used in Bots DB */
CREATE TABLE Bots(
    MAC_Addr VARCHAR(22) NOT NULL,
    IP_Addr VARCHAR(15) NOT NULL,
    port_no INT NOT NULL,
    name VARCHAR(255),
    PRIMARY KEY (MAC_Addr),
    CONSTRAINT MAC_CHECK CHECK (LENGTH(MAC_Addr)=22),
    CONSTRAINT IP_CHECK CHECK (LENGTH(IP_Addr)=15)
);

CREATE TABLE Commands(
    ID INT NOT NULL AUTO_INCREMENT,
    crt_time DATETIME NOT NULL,
    cmd TEXT NOT NULL,
    PRIMARY KEY (ID)
);

CREATE TABLE Bot_Commands(
    cmdID INT NOT NULL,
    botID VARCHAR(22) NOT NULL,
    Output TEXT,
    srt_time DATETIME,
    run_time DATETIME,
    PRIMARY KEY (cmdID, botID),
    FOREIGN KEY (cmdID) REFERENCES Commands(ID),
    FOREIGN KEY (botID) REFERENCES Bots(MAC_Addr)
);
