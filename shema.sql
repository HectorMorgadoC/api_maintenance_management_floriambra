
registered_user {
	id uuid pk increments unique
	username varchar(30) unique
	email varchar(50) unique
	process varchar(50) unique > process.name
	access_level varchar(20) unique
	password varchar(100)
}

team {
	id uuid pk increments unique
	name varchar(50) unique
	process varchar(50) unique > process.name
	march varchar(40) null
	model varchar(40) null
	working_voltage varchar(10)
	kilowatts varchar(10)
}

process {
	id uuid pk increments unique
	name varchar(50) unique
	description varchar(200)
}

work_order {
	id uuid pk increments unique
	process varchar(50) > process.name
	team varchar(50) > team.name
	id_applicant uuid > registered_user.id
	applicant varchar(30) > registered_user.username
	date_time timestamp unique
	fault_description varchar(200)
	order_state boolean def(false)
}

report {
	id uuid pk increments unique
	id_work_order uuid unique > work_order.id
	id_responsible_technician uuid > registered_user.id
	responsible_technician varchar(30) > registered_user.username
	Collaborators varchar(100) null
	fault_type varchar(20)
	type_of_maintenance varchar(20)
	from_date timestamp
	end_date timestamp
	summary_of_activities varchar(300)
	used_spare_parts varchar(200) null
	remarks varchar(300) null
	maintenance_approval boolean def(false)
	production_approval boolean def(false)
}
