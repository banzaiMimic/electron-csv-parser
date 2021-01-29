# electron-csv-parser
barebones csv parser running electron

### Ubuntu 20.04 & Linux Mint 20 pre-reqs
```
sudo apt install libgtk-3-0
sudo apt-get install libgbm1
sudo apt-get install dpkg
sudo apt install rpm
```

winehq-stable
```
sudo dpkg --add-architecture i386
wget -nc https://dl.winehq.org/wine-builds/winehq.key
sudo apt-key add winehq.key
sudo add-apt-repository 'deb https://dl.winehq.org/wine-builds/ubuntu/ focal main'
sudo apt-get update
sudo apt-get install --install-recommends winehq-stable
```

### troubleshooting

if you get this error
```
The following packages have unmet dependencies:
 winehq-stable : Depends: wine-stable (= 6.0.0~groovy-1
```

- edit your `/etc/apt/sources.list` and remove the line containing groovy
- redo the winehq-stable install steps