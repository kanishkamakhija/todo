## About
This is a single page web application that allows user to signup/login. This web application use the Python framework Flask
along with implementing third-party Google OAuth authentication. It uses the various HTTP methods available i.e GET, POST, 
DELETE, and, PATCH. These methods relate to CRUD (create, read, update and delete) operations, where user can create, read,
update, delete a todo which he is authorised to. It also includes the status of the todo wheather it is completed or undone.

User also has the proficiency to sort the list by dragging and dropping the todo. Except the sorting of the list don't last
if the web page is refreshed because it is not saved. The save API needs to be fixed but the changes are required in the 
internal structure of database and that is why It is not implemented beacuse whole of the backend would require changes then.

## Steps to Configure Linux server

1. Create Development Environment Instance.

 * [Create new development environment here.](https://signin.aws.amazon.com/signin?client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fhomepage&redirect_uri=https%3A%2F%2Fconsole.aws.amazon.com%2Fconsole%2Fhome%3Fstate%3DhashArgs%2523%26isauthcode%3Dtrue&page=resolve)

* Download private key provided and note down your public IP address.

* Save the private key downloaded in the same folder of you rproject.

2. Log in through SSH

 * Login into remote VM through SSH using following command from the console of the instance created:
   `ssh -i "<filename.pem>" ubuntu@ec2-18-218-96-168.us-east-2.compute.amazonaws.com`

3. Updating the python version.

 * First, check your current **Python version**:
  `$ python -V`

* We would like to have python run Python 3. So first, let's remove the old 2.7 binary.
  `$ sudo rm /usr/bin/python`

* Next, create a symbolic link to the Python 3 binary in its place.
  `$ sudo ln -s /usr/bin/python3 /usr/bin/python`
 
 > If you run `python -V` again, you will now see Python 3.5.2.
 
 4. Installing **Pip**.

* Update the system's package index. This will ensure that old or outdated packages do not interfere with the installation.
    `$ sudo apt-get update`

* Pip allows us to easily manage any Python 3 package we would like to have:
    `$ sudo apt-get install python3-pip`
    
    
5. Installing **MySQL**.

* Install and configure mysql:
   `$ sudo apt-get install mysql-server`
    
* Enter a strong password for the MySQL root user when prompted, and remember it, because we will need it later.
`$ mysql_secure_installation`

* Python 3 requires a way to connect with MySQL, We will use **pymysql** for this. Install it using Pip:
`$ sudo pip3 install pymysql`

* Log in to MySQL. You'll need to enter the MySQL root password you set earlier.
  `$ mysql -u root -p`

  * Create a Database.
   `$ mysql > CREATE DATABASE <database name>;`
  
  * Switch to the new database.
    `$ mysql > USE <database name>;`
  
  * Press CTRL+D to exit. 

 6. Installing **Apache2**.
  *  install Apache 2, and ensure that it recognizes Python files as executables. Install and Configure Apache2, mod-wsgi,        git:
    `$ sudo apt-get install apache2 libapache2-mod-wsgi git`
  
  * Enable mod_wsgi:
    `$ sudo a2enmod wsgi`
    Like MySQL, the Apache server will start once the installation completes.

 7. Configure local timezone to UTC

 * Change the timezone to UTC using following command:
 `$ sudo timedatectl set-timezone UTC.`
 
 * You can also open time configuration dialog and set it to UTC with:
 `$ sudo dpkg-reconfigure tzdata.`
 
 * Install ntp daemon ntpd for a better synchronization of the server's time over the network connection:
 `$ sudo apt-get install ntp`

> Source [Ubuntu Time](https://help.ubuntu.com/community/UbuntuTime)

7. Update all currently installed packages

 * `$ sudo apt-get update.`
 * `$ sudo apt-get upgrade.`

8. Configure the Uncomplicated Firewall (UFW)

 * `$ sudo ufw default deny incoming`
 * `$ sudo ufw default allow outgoing`
 * `$ sudo ufw allow 2200/tcp`
 * `$ sudo ufw allow www`
 * `$ sudo ufw allow ntp`
 * `$ sudo ufw enable`

9. Configure cron scripts to automatically manage package updates

 * Install unattended-upgrades if not already installed using command:
 `$ sudo apt-get install unattended-upgrades`
 
 * Enable it using command:
 `$ sudo dpkg-reconfigure --priority=low unattended-upgrades`

10. Change the SSH port from 22 to 2200

 * Find the Port line in the same file above, i.e /etc/ssh/sshd_config and edit it to 2200.
 
 * Save the file.
 
 * Run `$ sudo service ssh restart` to restart the service.
 
 * And login again using the command:
  `ssh -i "<filename.pem>" ubuntu@ec2-18-218-96-168.us-east-2.compute.amazonaws.com -p 2200`
  
11. Clone the **todo** app from Github. 
 
 * We want to place our website's root directory in a safe location. The server is by default at /var/www/html. To keep         convention, we will create a new directory for testing purposes, called test, in the same location.
    
    * Make a todo named directory in /var/www:
     `$ sudo mkdir /var/www/todo`
     
    * Register Python with Apache. To start, we disable multithreading processes:
      `$ sudo a2dismod mpm_event`
      
    * Give Apache explicit permission to run scripts:
      `$ sudo a2enmod mpm_prefork cgi`
 
    * Change the owner of the directory todo as ubuntu:
     `$ sudo chown -R ubuntu:ubuntu /var/www/catalog`
     
    * Clone the **todo** to the catalog directory:
     `$ git clone https://github.com/kanishkamakhija/todo.git todo`
     
    * Make a todo.wsgi file to serve the application over the mod_wsgi. with content:
     `$ nano todo.wsgi`
     
```
   import sys
   import logging
   logging.basicConfig(stream=sys.stderr)
   sys.path.insert(0, "/var/www/todo/")

   from main import app as application
```
   * Run the database_setup.py:
     `$ python database_setup.py` 
      
 12. Modify the actual Apache configuration, to explicitly declare Python files as runnable file and allow such executables        `$ sudo nano /etc/apache2/sites-enabled/000-default.conf`

```
    <VirtualHost *:80>
      ServerName XX.XX.XX.XX
      ServerAdmin kanishkamakhija007@gmail.com
      WSGIScriptAlias / /var/www/todo/todo.wsgi
      <Directory /var/www/todo/>
          Order allow,deny
          Allow from all
      </Directory>
      Alias /static /var/www/todo/static
      <Directory /var/www/todo/static/>
          Order allow,deny
          Allow from all
      </Directory>
   </VirtualHost>
```   

13. Restart Apache to launch the app.
   `$ sudo service apache2 restart`

