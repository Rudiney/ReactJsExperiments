var AULAS = {
  "15/11/2015": {
    11: [
      {"aluno":"Rudi", "day":"15/11/2015", "hour":11, "id":1, "presence":"presente"},
      {"aluno":"Manu", "day":"15/11/2015", "hour":11, "id":2, "presence":"falta"}
    ],
    12: [
      {"aluno":"Juca", "day":"15/11/2015", "hour":12, "id":3, "presence":"falta-justificada"},
      {"aluno":"Jessica", "day":"15/11/2015", "hour":12, "id":4, "presence":"presente"}
    ]
  },
  "16/11/2015": {
    6: [
      {"aluno":"Paulo", "day":"16/11/2015", "hour":6, "id":5, "presence":"falta"},
    ],
    7: [
      {"aluno":"José", "day":"16/11/2015", "hour":7, "id":6, "presence":"falta-justificada"}
    ]
  }
};

var Aula = React.createClass({
  showPath: function() { 
    return "/aula/" + this.props.id; 
  },
  cssClasses: function() {
    return ['aula', this.props.presence].join(' ');
  },
  render: function() {
    return (
      <a className={this.cssClasses()} href={this.showPath()} data={this.props.day} hora={this.props.hour} >
        {this.props.aluno}
      </a>
    );
  }
});

var Horario = React.createClass({
  renderMyClasses: function() {
    return this.props.classes.map(function(a) {
      return (
        <Aula key={a.id} aluno={a.aluno} day={a.day} hour={a.hour} id={a.id} presence={a.presence}/>
      );
    });
  },

  render: function() {
    return (
      <div className="horario">
        <h3>{this.props.hour}:00</h3>
        {this.renderMyClasses()}
      </div>
    );
  }
});

var Dia = React.createClass({
  workHours: function() {
    return [6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22];
  },

  renderHours: function() {
    return this.workHours().map(function(hour) {
      var key = this.props.day + '-' + hour;
      return (
        <Horario key={key} day={this.props.day} hour={hour} classes={this.props.classes[hour] || []} />
      );
    }.bind(this));
  },

  render: function() {
    return (
      <div className="dia">
        <h2>{this.props.day}</h2>
        {this.renderHours()}
      </div>
    );
  }
});

var Agenda = React.createClass({
  render: function() {
    return (
      <div className='agenda'>
      <h1>Agenda</h1>
        <Dia day="15/11/2015" classes={this.props.classes["15/11/2015"]} />
        <Dia day="16/11/2015" classes={this.props.classes["16/11/2015"]} />
      </div>
    );
  }
});

ReactDOM.render(
  <Agenda classes={AULAS} />,
  document.getElementById('agenda')
);