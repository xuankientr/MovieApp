const CircularProgressBar = ({
  percent = 0,
  size = 3,
  strokeWidth = 0.25,
  strokeColor = 'green',
}) => {
  const radius = size / 2 - strokeWidth;
  return (
    <div>
      <svg width={`${size}vw`} height={`${size}vw`}>
        <circle
          r={`${radius}vw`}
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          strokeWidth={`${strokeWidth}vw`}
          stroke='white'
        />
        <circle
          r={`${radius}vw`}
          cx={`${size / 2}vw`}
          cy={`${size / 2}vw`}
          fill='none'
          strokeWidth={`${strokeWidth}vw`}
          stroke={strokeColor}
          strokeDasharray={`${2 * Math.PI * radius}vw`}
          strokeDashoffset={`${2 * Math.PI * radius - (percent / 100) * 2 * Math.PI * radius}vw`}
          transform='rotate(-90)'
          style={{ transformOrigin: 'center' }}
          strokeLinecap='round'
        />
        <text
          x='27px'
          y='30px'
          fill='white'
          fontSize='1.2vw'
          alignmentBaseline='middle'
          textAnchor='middle'
        >
          {percent}
        </text>
      </svg>
    </div>
  );
};
export default CircularProgressBar;
