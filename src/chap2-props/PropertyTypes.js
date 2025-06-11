import PropTypes from 'prop-types';

const PropertyTypes = ({name="기본이름", location="기본지역"}) => {
    return <div>
        <h1>이름:{name}</h1>
        <h1>지역:{location}</h1>
    </div>
}

PropertyTypes.propTypes = {
    name: PropTypes.string.isRequired
};

export default PropertyTypes;