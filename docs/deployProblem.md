* map port 8080 to 80

* use nvm to start npm command

* check the security group for the ssh

* start mongodb service `sudo service mongod start`

* `pm2 start ecosystem.json`

* `bcrypt` problem, use `npm rebuild` to solve it

* ip table has been reset, check `sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080`
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 3000

check rules:

`sudo iptables -t nat -L`

delete rules:

`sudo iptables -t nat -D PREROUTING 1`

forward rules:

`iptables -t nat -A PREROUTING -p tcp --dport 443 -j REDIRECT --to 8080`

* Port conflict problems, to kill a process running at port 

`kill $(lsof -t -i:3030)`