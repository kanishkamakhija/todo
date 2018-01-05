## About
This is a single page web application that allows user to signup/login. This web application use the Python framework Flask
along with implementing third-party Google OAuth authentication. It uses the various HTTP methods available i.e GET, POST, 
DELETE, and, PATCH. These methods relate to CRUD (create, read, update and delete) operations, where user can create, read,
update, delete a todo which he is authorised to. It also includes the status of the todo wheather it is completed or undone.

User also has the proficiency to sort the list by dragging and dropping the todo. Except the sorting of the list don't last
if the web page is refreshed because it is not saved. The save API needs to be fixed but the changes are required in the 
internal structure of database and that is why It is not implemented beacuse whole of the backend would require changes then.

## PREREQUISITES
* Vagrant
* Pyhton 
* VirtualBox

## INSTALLING
* Install [Vagrant](https://www.vagrantup.com/)
* Install [VirtualBox](https://www.virtualbox.org/)
* Launch the Vagrant Machine using `vagrant up`
* Run the web-app using `python /vagrant/todo/main.py
* Open the browser window and type `http://localhost:5000`(http://localhost:5000)

## TO RUN
* Launch Vagrant VM by running `vagrant up`, and after running you can the log in with `vagrant ssh`.
* To execute the program, run `python main.py`from the command line.
